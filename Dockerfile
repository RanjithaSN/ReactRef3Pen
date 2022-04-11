FROM node:14-alpine as builder
ARG buildId
ENV BUILD_ID=$buildId
USER root
RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY babel.config.js babel.config.js
COPY src src
COPY scripts scripts
COPY config config
COPY webpack webpack
RUN apk add --no-cache --virtual .gyp python make g++ libjpeg-turbo-dev libpng-dev
RUN yarn --frozen-lockfile
RUN yarn build

FROM node:alpine
USER root
RUN mkdir -p /app
RUN mkdir -p /var/log/containers
WORKDIR /app
COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json package.json
RUN npm i -g cross-env

CMD ["yarn", "prod"]

EXPOSE 8002
