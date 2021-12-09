#!/bin/bash
rm -rf dist node_modules

docker stop $(docker ps -a -q  --filter ancestor=jeduardogd/fmrecontest-front-v5)
docker rm   $(docker ps -a -q  --filter ancestor=jeduardogd/fmrecontest-front-v5)
docker rmi jeduardogd/fmrecontest-front-v5

docker build -t jeduardogd/fmrecontest-front-v5 .