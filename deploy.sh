#!/usr/bin/env sh

# abort on errors
set -e

# build the project
npm run build

# navigate into the build output directory
cd dist

cd -