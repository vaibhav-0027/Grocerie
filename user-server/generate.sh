#!/bin/bash

protoc proto/server.proto --go_out=plugins=grpc:.