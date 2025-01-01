#!/bin/bash

docker build -f Dockerfile_generate_package_lock -t generate-lockfile .

docker run --rm -v $(pwd):/output generate-lockfile

ls package-lock.json
