FROM nginx:alpine
LABEL maintainer="luffyZh"
COPY ./build /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
