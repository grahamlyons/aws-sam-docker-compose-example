#!/bin/bash

set -euo pipefail

export COMPOSE_PROJECT_NAME="aws-sam-docker-compose-example-test"

export DOCKER_DEFAULT_PLATFORM=linux/amd64

function cleanup() {
    docker-compose down
}

trap cleanup EXIT

docker-compose up \
    --build \
    --abort-on-container-exit \
    --exit-code-from=acceptance-test \
    --attach-dependencies \
    acceptance-test
