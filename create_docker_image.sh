#!/bin/bash
rm -rf dist node_modules
docker rmi jeduardogd/fmrecontest-front-v5
docker build -t jeduardogd/fmrecontest-front-v5 .