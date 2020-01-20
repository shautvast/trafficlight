FROM node:10

VOLUME /data
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src .
EXPOSE 5555

CMD [ "node", "server.js" ]