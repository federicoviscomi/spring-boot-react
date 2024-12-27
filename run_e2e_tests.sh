#!/bin/bash
set -euxo pipefail

DATA_DIRECTORY=./test-data/

cleanup() {
    echo "Cleaning up..."
    docker compose -f docker-compose.yml -f docker-compose-e2e-tests.yml down
    rm -Rf "${DATA_DIRECTORY}"
}

# delete old test data(if any), it will be recreated
cleanup

# Trap the EXIT signal to ensure cleanup when the script exits
trap cleanup EXIT

# Start the docker events listener in the background
docker events --filter event=die --format '{{.Actor.Attributes.name}}' |
while read CONTAINER_NAME; do
  if [ "$CONTAINER_NAME" == "cypress" ]; then
    echo "Cypress container stopped. Exiting..."
    cleanup
    break
  fi
done &

DATA_DIRECTORY=./test-data/ docker compose -f docker-compose-e2e-tests.yml up --build 
