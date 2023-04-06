FROM node:18-alpine

ENV DEVELOPMENT=false
ENV MONGOURI="mongodb+srv://root:pass@localhost:2701"
ENV PORT="80"
ENV FINNHUBAPIKEY=""
ENV ALPHAVANTAGEAPIKEY=""

WORKDIR /server
COPY ./dist/ /server/

CMD ["node", "whaletrade.bundle.js"]