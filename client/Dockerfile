FROM node:15-alpine as base
ENV PORT 3000

WORKDIR /app
COPY package*.json ./

FROM base as develop
ENV NEXT_PUBLIC_API_URL="http://localhost:9090"
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]
