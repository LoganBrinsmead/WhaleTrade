FROM node:18-alpine

# install mongodb
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb

# install nodejs process manager
RUN npm install -g forever

# Environment Variables
ENV DEVELOPMENT=false
ENV MONGOURI="mongodb://localhost:27017"
ENV PORT="80"
ENV FINNHUBAPIKEY=""
ENV ALPHAVANTAGEAPIKEY=""

# Copy bundle and static build files
WORKDIR /server
COPY ./dist /server/dist

# use pm to run server - needs to be configured for logging
# run forever in foreground
CMD ["forever", "dist/whaletrade.bundle.js"]