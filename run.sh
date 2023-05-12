#!/bin/sh

nohup /usr/bin/redis-server &
nohup mongod -f /server/mongodb_config.yml & 

forever whaletrade.bundle.js
