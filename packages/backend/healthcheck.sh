#!/bin/sh
curl --fail-with-body --write-out "\n%{http_code}\n" 127.0.0.1:3000/health || exit 1
