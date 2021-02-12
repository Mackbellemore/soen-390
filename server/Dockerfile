FROM node:15-alpine as base
ENV NODE_ENV=development

WORKDIR /code
COPY package*.json /code/

FROM base as develop
RUN npm install
COPY . .

EXPOSE 9090
ENTRYPOINT ["npm", "run"]
CMD ["dev"]
