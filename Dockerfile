FROM node:alpine AS deps

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn

COPY . /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

ENTRYPOINT ["yarn", "dev"]