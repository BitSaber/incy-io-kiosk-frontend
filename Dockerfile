FROM node:8
RUN mkdir app
COPY ./heroku_docker .
RUN yarn install
COPY ./dist/* ./app/
CMD yarn start
