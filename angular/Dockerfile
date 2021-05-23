# Stage 1
FROM centos:8

RUN dnf update -y

RUN dnf install httpd -y

COPY dist/angular/ /var/www/html

CMD ["/usr/sbin/httpd","-D","FOREGROUND"]

EXPOSE 4200