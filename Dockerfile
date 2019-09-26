FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY default.conf /etc/nginx/conf.d/
COPY dist/POC-grupo-aval/ /usr/share/nginx/html/
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
RUN addgroup nginx root
# --- Expose and CMD ---
EXPOSE 8080
#CMD gunicorn --bind 0.0.0.0:5000 wsgi --chdir /usr/share/nginx/html/ & nginx -g "daemon off;"
CMD ["nginx", "-g", "daemon off;"]

