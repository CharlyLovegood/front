FROM node:11-alpine as build-stage
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build


from nginx:1.15-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf