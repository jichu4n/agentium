#!/bin/bash

set -ex

cp build/{index,popup}.html
cp build/{index,background}.html
cp build/{index,options}.html
rm build/index.html
