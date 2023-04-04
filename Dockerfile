FROM node:19-buster-slim

ENV NODE_ENV test

WORKDIR /opt/

RUN apt-get update && apt-get install -y wait-for-it netcat curl unzip && \
    (cd /tmp/ && curl -OL https://github.com/aws/aws-sam-cli/releases/download/v1.78.0/aws-sam-cli-linux-x86_64.zip && \
    unzip aws-sam-cli-linux-x86_64.zip && ./install) && \
    npm install -g npm@8.1.1

COPY package.json ./

RUN npm install

COPY . .
