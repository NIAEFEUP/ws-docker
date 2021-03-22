# It is advised to always pin the base image to a specific version
FROM node:14.15.4-buster-slim

WORKDIR /usr/src/app

# We will now install the dependencies. Because they change less often than the
# code, this will allow the container build system to cache the dependencies
# between builds
COPY package*.json ./
RUN npm ci

# copy the code over
COPY ./components ./components
COPY ./pages ./pages
COPY ./public ./public
COPY ./styles ./styles
COPY ./util ./util

# [NODE SPECIFIC] we should not run our program as root if it is not necessary
RUN chown -R node:node .
USER node

# [NextJS specific: build the production bundles]
RUN npm run build

# If the container is run with the -P flag this port will be published.
# Otherwise it is just documentation
EXPOSE 3000

CMD ["npm", "run", "start"]
