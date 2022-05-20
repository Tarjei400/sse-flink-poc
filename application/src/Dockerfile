FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install apache-flink-statefun@3.2.0

COPY example.js ./

EXPOSE 8000
CMD ["npm", "start"]
