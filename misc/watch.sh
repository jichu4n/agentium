#!/bin/bash

export PATH="$(npm bin):$PATH"
set -ex

onchange \
  -i \
  -v \
  '**/*' \
  --exclude-path .gitignore \
  --await-write-finish 2000 \
  -- \
  npm run build
