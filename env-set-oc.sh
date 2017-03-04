#!/bin/sh

oc apply -f mysql-pv-claim.yml
oc apply -f db-deployment.yml
oc apply -f db-srv.yml
oc apply -f node-deployment.yml
oc apply -f node-srv.yml
oc apply -f node-route.yml

