#!/bin/bash
set -euxo pipefail

export DATA_DIRECTORY=./test-data/

echo "Cleaning up..."
docker compose -f docker-compose.yml -f docker-compose-e2e-tests.yml down
rm -Rf "${DATA_DIRECTORY}"
docker compose -f docker-compose-e2e-tests.yml up --build 
