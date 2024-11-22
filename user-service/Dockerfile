FROM node:20

WORKDIR /usr/src/app

# Установка PostgreSQL клиента
RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["./wait-for-it.sh", "postgres", "npm", "run", "start:prod"]