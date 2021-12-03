#!/bin/bash

set -e

if [ ! -d ./node_modules/ ]
then
    echo "Copying node_modules folder"
    cp -r /opt/node_modules/ ./
fi

node ./__tests__/create-db.js

sam local start-api \
    --host 0.0.0.0 \
    --container-host-interface 0.0.0.0 \
    --container-host host.docker.internal \
    --debug \
    --docker-volume-basedir $PWD \
    --docker-network=aws-sam-docker-compose-example-test_default \
    --region=eu-west-1
