FROM node:15-alpine as base
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=9090

WORKDIR /code
COPY package*.json /code/

FROM base as develop
RUN npm install
COPY . .

EXPOSE 9090
ENTRYPOINT ["npm", "run"]
CMD ["dev"]
