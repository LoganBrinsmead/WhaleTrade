FROM node:18-alpine

# install mongodb
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb
RUN apk add mongodb-tools

# install nodejs process manager
RUN npm install -g forever

# Environment Variables
ENV SERVER=production
ENV DEVELOPMENT=false
ENV MONGOURI=mongodb://localhost:27017
ENV PORT=80
ENV FINNHUBAPIKEY=none
ENV ALPHAVANTAGEAPIKEY=none

# Copy bundle and static build files
WORKDIR /server
COPY mongo_config.yml /server/mongo_config.yml
COPY dist/ /server/

# start database
RUN mkdir -p /data/db
RUN nohup mongod -f /server/mongo_config.yml &

# use pm to run server - needs to be configured for logging
# run forever in foreground
CMD ["forever", "whaletrade.bundle.js"]