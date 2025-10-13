FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm install -g ts-node typescript

EXPOSE 3000

CMD ["ts-node", "src/system/load-generator.ts"]