import anyio
import dagger 
import sys
import argparse
from utils.dockerlogin import dockerLogin, dockerLogout

parser = argparse.ArgumentParser()
parser.add_argument("--login", help="Login to dockerhub locally:       True | False", default=True)
parser.add_argument("--push", help="Build and push image to dockerhub: True | False", default=False)
parser.add_argument("--export", help="Exports the build directory:     True | False", default=True)
parser.add_argument("--tag", help="The tag for the container image: ", default="develop")

args = parser.parse_args()

async def pipeline():
    async with dagger.Connection(dagger.Config(log_output=sys.stderr)) as client:
        print('Starting Pipeline')
        # get project source
        src = client.host().directory(".")
        # install deps & run react-scripts build
        web = (
            client.container().from_("node:18-alpine3.16")
                .with_mounted_directory("/app", src)
                .with_workdir("/app/front-end")
                .with_exec(["npm", "install"])
                .with_exec(["npm", "run", "build"])
        )
        # await npm front-end build script
        build_output = await web.stdout()
        # save contents of build dir for later
        public_src = web.directory("./build")
        print('react-scripts build finished...Bundeling Server...')
        # bundle backend api
        api = (
            client.container().from_("node:18-alpine3.16")
                .with_mounted_directory("/app", src)
                .with_workdir("/app/api")
                .with_directory("/app/api/public", public_src)
                .with_exec(["npm", "install"])
                .with_exec(["npm", "run", "build"])
        )
        build_output = await api.exit_code()
        # save bundled server
        dist_src = api.directory("./dist")
        
        # export bundle to host
        if args.export == True or args.export is None:
            await dist_src.export("./dist")

        if args.push == True:
            print('Building & Push Docker Image')
            build = (
                client.container()
                    .with_mounted_directory("/app", src)
                    .with_workdir("/app")
                    .with_directory("/dist", dist_src)
                    .build(src)
                    .publish(f"docker.io/whaletrade/whaletrade:{args.tag}")
            )
            await build

    print('Finished Build Pipeline...')


if __name__ == '__main__':
    print('running....')
    try:
        if args.login:
            dockerLogin()
        anyio.run(pipeline)
        if args.login:
            dockerLogout()
    except: 
        print('Error Running Pipeline')
        sys.exit(3)
        
