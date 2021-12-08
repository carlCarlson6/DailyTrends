# syntax=docker/dockerfile:1

FROM node:14.16.0 as node

WORKDIR /webapp

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /webapp/dist/frontend /usr/share/nginx/html
