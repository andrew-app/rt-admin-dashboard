FROM nginx:stable-alpine3.17-slim
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY cert.pem /etc/nginx/ssl/
COPY privkey.pem /etc/nginx/ssl/