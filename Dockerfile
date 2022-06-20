FROM nginx:alpine

COPY fitting-room-module/ test-webstore/. /usr/share/nginx/html/