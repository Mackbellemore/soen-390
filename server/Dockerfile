FROM node:15-alpine as base
ENV NODE_ENV=development
ENV AWS_ACCESS_KEY_ID=test
ENV AWS_SECRET_ACCESS_KEY=test
ENV AWS_DEFAULT_REGION=us-east-1

WORKDIR /code
COPY package*.json /code/

FROM base as develop
RUN npm install
COPY . .

EXPOSE 9090
ENTRYPOINT ["npm", "run"]
CMD ["dev"]
