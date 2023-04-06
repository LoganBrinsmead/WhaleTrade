FROM node:18-alpine

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb
RUN apk add mongodb-tools

ENV DEVELOPMENT=false
ENV MONGOURI="mongodb://localhost:2701"
ENV PORT="80"
ENV FINNHUBAPIKEY=""
ENV ALPHAVANTAGEAPIKEY=""

WORKDIR /server
COPY ./dist/ /server/

CMD ["node", "whaletrade.bundle.js"]