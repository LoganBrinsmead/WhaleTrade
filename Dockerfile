FROM node:18-alpine

# install mongodb
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories 
RUN apk update
 
#RUN apk add openrc
RUN apk add mongodb
RUN apk add mongodb-tools
# install redis
RUN apk add redis

# install nodejs process manager
RUN npm install -g forever

# Environment Variables
ENV SERVER=production
ENV DEVELOPMENT=false
ENV MONGOURI=mongodb://localhost:27017
ENV PORT=80
ENV FINNHUBAPIKEY=none
ENV ALPHAVANTAGEAPIKEY=none
ENV REDISSESSIONSTORE=secret

EXPOSE ${PORT}
EXPOSE 443

# Copy bundle and static build files
WORKDIR /server
COPY mongo_config.yml /server/mongo_config.yml
COPY mongodb_service /server/mongodb_service
COPY redis_service /server/redis_service
COPY dist/ /server/

# start database
RUN mkdir -p /data/db
VOLUME /data/db

#RUN rc-update
# start mongodb service
#RUN rc-service /server/mongodb_service start
#RUN rc-service /server/redis_service start
RUN nohup mongod -f /server/mongo_config.yml &
RUN nohup /usr/bin/redis-server &

# use pm to run server - needs to be configured for logging
# run forever in foreground
#CMD ["forever", "whaletrade.bundle.js"]
ENTRYPOINT ["/bin/sh"]
