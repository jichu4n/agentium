#!/bin/bash

export PATH="$(npm bin):$PATH"
set -ex

ROOT="$PWD"
BUILD_DIR="$ROOT/build"
OUTPUT_DIR="$ROOT/build-edge"
OUTPUT_EXTENSION_DIR="$OUTPUT_DIR/AgentiumUseragentswitcher/edgeextension"
OUTPUT_MANIFEST_DIR="$OUTPUT_EXTENSION_DIR/manifest"
SCRIPT_DIR="$ROOT/packaging/edge"

if [ ! -d "$BUILD_DIR"]; then
  echo 'Please build with "npm build" first'
  exit 1
fi
if [ -d "$OUTPUT_DIR" ] ; then
  rm -rf "$OUTPUT_DIR"
fi
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

manifoldjs \
  -p edgeextension \
  -f edgeextension \
  -m "$BUILD_DIR/manifest.json"

cp "$SCRIPT_DIR/icon-44.png" "$OUTPUT_MANIFEST_DIR/Assets/Square44x44Logo.png"
cp "$SCRIPT_DIR/icon-150.png" "$OUTPUT_MANIFEST_DIR/Assets/Square150x150Logo.png"
cp "$SCRIPT_DIR/icon-50.png" "$OUTPUT_MANIFEST_DIR/Assets/StoreLogo.png"
diff {"$OUTPUT_MANIFEST_DIR","$SCRIPT_DIR"}/appxmanifest.xml || true
cp {"$SCRIPT_DIR","$OUTPUT_MANIFEST_DIR"}/appxmanifest.xml

manifoldjs \
  -p edgeextension \
  package \
  "$OUTPUT_MANIFEST_DIR"

mv {"$OUTPUT_EXTENSION_DIR/package","$OUTPUT_DIR"}/edgeExtension.appx
