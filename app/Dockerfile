FROM node:alpine

WORKDIR /usr/app
COPY . /usr/app
RUN npm i

EXPOSE 8081

CMD ["npm", "run", "start"]