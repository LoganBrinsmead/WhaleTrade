import anyio
import dagger 
import sys
import argparse
from utils.dockerlogin import dockerLogin, dockerLogout

parser = argparse.ArgumentParser()
parser.add_argument("--tag", help="The tag for the container image: ", default="develop")
parser.add_argument("--no-login", help="do not handle registry login w/ this script", action='store_true')
parser.add_argument("-e", "--export", help="export a build directory 'dist' that contains the final build files", action='store_true')
parser.add_argument("-p", "--push", help="push the image to docker hub", action='store_true')

args = parser.parse_args()

async def pipeline():
    async with dagger.Connection(dagger.Config(log_output=sys.stderr)) as client:
        print('Starting Pipeline')
        # get project source
        src = client.host().directory(".")
        # install deps & run react-scripts build
        web = (
            client.container().from_("node:18-alpine")
                .with_mounted_directory("/app", src)
                .with_workdir("/app/front-end")
                .with_exec(["npm", "install"])
                .with_exec(["npm", "run", "build"])
        )
        # await npm front-end build script
        await web.exit_code()
        # save contents of build dir for later
        public_src = web.directory("./build")
        print('react-scripts build finished...Bundling Server...')
        # bundle backend api
        api = (
            client.container().from_("node:18-alpine")
                .with_mounted_directory("/app", src)
                .with_workdir("/app/api")
                .with_directory("/app/api/public", public_src)
                .with_exec(["npm", "install"])
                .with_exec(["npm", "run", "build"])
        )
        # await build script for backend api
        await api.exit_code()
        # save bundled server
        dist_src = api.directory("./dist")
        
        # export bundle to host
        if args.export:
            cr1 = await dist_src.export("./dist")
            if not cr1:
                print('Failed to export final bundle to host.')
                sys.exit(10)

        # build & push image to docker hub
        if args.push:
            print('Building & Push Docker Image')
            build = (
                client.container()
                    .with_mounted_directory("/app", src)
                    .with_workdir("/app")
                    .with_directory("/app/dist", dist_src)
                    .build(src)
                    .publish(f"docker.io/whaletrade/whaletrade:{args.tag}")
            )
            cr2 = await build
            if not cr2:
                print('Failed to push or build docker container')
                sys.exit(11)
            print(f'Pushed Image to Dockerhub w/ tag: {args.tag}')

    print('Finished Build Pipeline...')


if __name__ == '__main__':
    print('running....')
    try:
        if not args.no_login:
            dockerLogin()
        anyio.run(pipeline)
        if not args.no_login:
            dockerLogout()
    except: 
        print('Error Running Pipeline')
        sys.exit(3)
        
