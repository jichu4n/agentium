#!/bin/bash

set -ex

ROOT="$PWD"
BUILD_DIR="$ROOT/build"
OUTPUT_DIR="$ROOT/build-firefox"

if [ ! -d "$BUILD_DIR"]; then
  echo 'Please build with "npm build" first'
  exit 1
fi
if [ -d "$OUTPUT_DIR" ] ; then
  rm -rf "$OUTPUT_DIR"
fi
mkdir -p "$OUTPUT_DIR"

cd "$BUILD_DIR"
zip -r -FS "$OUTPUT_DIR/extension.xpi" *
