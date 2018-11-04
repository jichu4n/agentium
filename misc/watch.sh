#!/bin/bash

export PATH="$(npm bin):$PATH"
set -ex

onchange \
  -i \
  '**/*' \
  -e 'build/**/*' \
  -e 'build-edge/**/*' \
  --await-write-finish \
  -- \
  npm run build
