#!/bin/sh

MYSQL_ROOT_PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32})
B64_MYSQL_ROOT_PASSWORD=$(echo -n $MYSQL_ROOT_PASSWORD | base64 -w0)
B64_DATABASE_USER=$(echo -n $DATABASE_USER | base64 -w0)
B64_DATABASE_PASSWORD=$(echo -n $DATABASE_PASSWORD | base64 -w0)
B64_DATABASE_CONNECTION=$(echo -n \
    "mysql://$DATABASE_USER:$DATABASE_PASSWORD@db-service:3306/appointments" \
    | base64 -w0)

sed "\
  s|%MYSQL_ROOT_PASSWORD|$B64_MYSQL_ROOT_PASSWORD|;\
  s|%MYSQL_USER|$B64_DATABASE_USER|;\
  s|%MYSQL_PASSWORD|$B64_DATABASE_PASSWORD|;\
  s|%DATABASE_CONNECTION|$B64_DATABASE_CONNECTION|" \
  mysql-secrets.yml | oc apply -f -

oc apply -f mysql-pv-claim.yml
oc apply -f db-deployment.yml
oc apply -f db-srv.yml
oc apply -f node-deployment.yml
oc apply -f node-srv.yml
oc apply -f node-route.yml

