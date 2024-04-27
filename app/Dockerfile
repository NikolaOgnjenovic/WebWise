FROM node:21.6.2-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY ./web-wise/package.json .

RUN npm install

COPY ./web-wise .

EXPOSE 4200

CMD npm start
