# WhaleTrade Docker Image

> See [Github](https://github.com/LoganBrinsmead/WhaleTrade) for more information

<hr>

## Usage

### Basic
```shell
docker run -d \
  -p 80:80 \
  -e FINNHUBAPIKEY=<apikey> \
  -e ALPHAVANTAGEAPIKEY=<apikey> \
  --name whaletrade-server \
  whaletrade/whaletrade:latest
```

### Persist Database Data
```shell
docker run -d \
  -p 80:80 \
  -v ~/whaletrade/data:/data/db
  -e FINNHUBAPIKEY=<apikey> \
  -e ALPHAVANTAGEAPIKEY=<apikey> \
  --name whaletrade-server \
  whaletrade/whaletrade:latest
```

### Docker Compose
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

### Environment Variables
Register for api keys: [finnhub.io]() & [alphavantage.co]()

| Key                  | Value                                |
|----------------------|--------------------------------------|
| `FINNHUBAPIKEY`      | `<apikey>` (required)                |
| `ALPHAVANTAGEAPIKEY` | `<apikey>` (required)                |
| `PORT`               | default: `80`                        |
| `MONGOURI`           | default: `mongodb://localhost:27017` |

