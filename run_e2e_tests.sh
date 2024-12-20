#!/bin/bash
set -euxo pipefail

# delete old test data(if any), it will be recreated
DATA_DIRECTORY=./test-data/
rm -Rf "${DATA_DIRECTORY}"

cleanup() {
    echo "Cleaning up..."
    rm -Rf "${DATA_DIRECTORY}"
    docker compose -f docker-compose.yml -f docker-compose-e2e-tests.yml down
}

# Trap the EXIT signal to ensure cleanup when the script exits
trap cleanup EXIT

DATA_DIRECTORY=./test-data/ docker compose -f docker-compose-e2e-tests.yml up --build
