#!/usr/bin/env bash

docker run --name reactjs-spring -d -p 8080:8080 -v "$(pwd)"/files:/opt/reactjs-spring/files  reactjs-spring:latest --filespath=file:/opt/reactjs-spring/files/
