#!/usr/bin/env bash
# prepare test-db image if not in CI environment, and then run e2e tests

set -e # exit on error

# if not in CI environment, prepare test-db image
if [ -z "$CI" ]; then
    # check if test-db is running otherwise start docker compose
    if [ "$(docker ps -q -f name=test_db)" ]; then
        echo "test-db is already running"
    else
        docker compose up test-db -d
    fi

    # wait for test-db to be ready
    while ! docker exec test_db pg_isready -U postgres; do
        sleep 1
    done

    # set environment variables
    export DATABASE_URL=postgres://username:password@localhost:5433/postgres

    # reset test-db
   npm run db:reset:force
fi