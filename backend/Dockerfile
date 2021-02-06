# Here we indicate a base image. This image already has node.js installed in it
FROM node

# This is where our app will reside, inside the container's filesystem
WORKDIR /usr/src/app

# Copy the files and install dependencies
COPY . .
RUN npm install

# If the container is run with the -P flag this port will be published.
# Otherwise it is just documentation
EXPOSE 5555

CMD ["node", "./src/index.js"]
