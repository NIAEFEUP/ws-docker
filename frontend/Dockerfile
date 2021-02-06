# this file will demonstrate a multi-stage build
# we give our temporary build environment a name
FROM node:14.15.4-buster-slim AS build

WORKDIR /usr/src/app

# install needed dependencies
COPY package*.json ./
RUN npm ci

# copy files from the least to the most likely to change
COPY ./rollup.config.js ./rollup.config.js
COPY ./public ./public
COPY ./src ./src

# build the app - the result is output to ./public
RUN npm run build

# we re-declare the base image, this time for our final build
# in our case we use caddy, a web server
FROM caddy:2.2.1-alpine

# copy the app files into the server files directory
# we use the `--from` flag to indicate that our source is the
# build environment, not our host machine
COPY --from=build /usr/src/app/public /usr/share/caddy
