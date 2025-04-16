FROM alfg/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /mnt/hls

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]