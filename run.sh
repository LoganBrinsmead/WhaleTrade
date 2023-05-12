#!/bin/sh

nohup /usr/bin/redis-server &
nohup mongod & 

forever whaletrade.bundle.js
