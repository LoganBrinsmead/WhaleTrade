# WhaleTrade
<hr>

![ProjectLogo](https://github.com/LoganBrinsmead/WhaleTrade/blob/dev/front-end/src/component/logo/typelogo-full-color_white.png)

![Tests](https://github.com/LoganBrinsmead/WhaleTrade/actions/workflows/api_testing.yml/badge.svg?branch=main)
![Build](https://github.com/LoganBrinsmead/WhaleTrade/actions/workflows/run_dagger.yml/badge.svg?branch=main)

[![Docker Pulls](https://img.shields.io/docker/pulls/whaletrade/whaletrade.svg)](https://hub.docker.com/r/whaletrade/whaletrade)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
## Features

## Deploy With Docker
### Docker command:
```shell
docker run -d \
  -p 80:80 \
  -e FINNHUBAPIKEY=finnhubapikey \
  -e ALPHAVANTAGEAPIKEY=alphavantageapikey \
  --name whaletrade-server \
  whaletrade/whaletrade:latest
```
### Docker compose:
```yaml
version: "3"

services:
  whaletrade:
    container_name: whaletrade-server
    image: whaletrade/whaletrade:latest
    ports:
      - "80:80"
    volumes:
      - "~whaletrade/data:/data/db"
    environment:
      - PORT=80                                        # (OPTIONAL) change the port of the server
      - FINNHUBAPIKEY=""                               # (REQUIRED) api key from finnhub.io
      - APLPHAVANTAGEAPIKEY=""                         # (REQUIRED) api key from alphavantage.co
      - MONGOURI="mongodb+srv://user:pass@example.com" # (OPTIONAL) set if you don't want to use the packaged database
    restart: unless-stopped

```

## Contributors:
![Contributors](https://contrib.rocks/image?repo=LoganBrinsmead/WhaleTrade)