#!/usr/bin/env bash
# This script updates docs/api/salesforce-frontend-service.yaml

if [ -z "$CI" ]; then
  # Kill all child processes (the server) when this script exits
  # This fails in CI for some reason (exit status 143)
  trap "kill 0" EXIT
fi
if [ "$CI" = "true" ]; then
  NODE_ENV=production && npm run start &
else
  NODE_ENV=production && npm run start  > /dev/null 2>&1 &
fi
source scripts/wait-for-local-http
# Wait a little more
sleep 3
curl http://localhost:3000/openapi-yaml -o docs/api.yaml
