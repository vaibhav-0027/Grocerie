#!/bin/bash

# npm install grpc_tools_node_protoc_ts --save-dev

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./proto"

# error might occur when running this script.
# for successfully running this script, we need to install 
# grpc_tools_node_protoc_ts globally first
# npx grpc_tools_node_protoc \
#     --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
#     --ts_out=${OUT_DIR} \
#     --js_out=import_style=commonjs,binary:${OUT_DIR} \
#     --grpc_out=grpc_js:${OUT_DIR} \
#     proto/server.proto

# protoc
npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${OUT_DIR} \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:${OUT_DIR} \
    -I=proto \
    proto/server.proto 
