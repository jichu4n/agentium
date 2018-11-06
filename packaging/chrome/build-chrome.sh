#!/bin/bash

set -ex

ROOT="$PWD"
FIREFOX_OUTPUT_FILE="$ROOT/build-firefox/extension.xpi"
OUTPUT_DIR="$ROOT/build-chrome"

npm run build-firefox
if [ -d "$OUTPUT_DIR" ] ; then
  rm -rf "$OUTPUT_DIR"
fi
mkdir -p "$OUTPUT_DIR"
cp "$FIREFOX_OUTPUT_FILE" "$OUTPUT_DIR/extension.zip"
