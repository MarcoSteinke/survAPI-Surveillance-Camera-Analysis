FROM mysql:latest

MAINTAINER me

ENV MYSQL_DATABASE=SurvAPI \
    MYSQL_ROOT_PASSWORD=example

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306