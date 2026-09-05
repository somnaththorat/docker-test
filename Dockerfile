FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY app.js .

EXPOSE 3000

# CMD ["node", "app.js"] // commented this line to keep the container running for testing purposes

CMD ["tail", "-f", "/dev/null"]