#!/bin/env sh
PATH_TO_DATA="$PWD/data"

docker volume create --driver local \
    --opt type=none --opt "device=$PATH_TO_DATA" \
    --opt o=bind web_data
