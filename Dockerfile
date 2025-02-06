FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "start"] 