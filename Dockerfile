FROM node:13.6.0-alpine

LABEL company="Company"
LABEL version="1.0"

# API-Service app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Ensure both package.json AND package-lock.json are copied
ADD package.json ./package.json
# ADD package-lock.json ./package-lock.json

RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp

# Linking dependency for node-logging-lib
RUN npm link winston

# Bundle app source
COPY . .

CMD [ "npm", "run", "prod" ] 