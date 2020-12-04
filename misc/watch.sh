#!/bin/bash

export PATH="$(npm bin):$PATH"
set -ex

onchange \
  -i \
  '**/*' \
  --exclude-path .gitignore \
  --await-write-finish 2000 \
  -- \
  npm run build
