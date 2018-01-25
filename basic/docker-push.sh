#!/usr/bin/env bash

if [ $# -lt 1 ]; then
    echo "syntax: docker-tag <tag-id>"
    exit 1
fi

docker tag $1 bennychen/reactjs-spring:latest
if [ ! $? -eq 0 ]; then
    echo "docker tag failed"
    exit 1
fi

docker push bennychen/reactjs-spring
if [ ! $? -eq 0 ]; then
    echo "docker push failed"
    exit 1
fi

echo "Pushed bennychen/reactjs-spring image to docker hub..."

exit 0


