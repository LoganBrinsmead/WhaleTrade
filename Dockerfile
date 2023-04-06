FROM node:18-alpine

ENV DEVELOPMENT=false
ENV MONGOURI=""
ENV PORT=""
ENV FINNHUBAPIKEY=""
ENV ALPHAVANTAGEAPIKEY=""

WORKDIR /server
COPY ./dist/ /server/

CMD ["node", "whaletrade.bundle.js"]