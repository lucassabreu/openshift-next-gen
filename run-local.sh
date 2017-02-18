source app/.env

docker stop app-test db-test &> /dev/null
yes | docker rm app-test db-test &> /dev/null

docker run -d --name db-test -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=${DATABASE_NAME} -e MYSQL_USER=${DATABASE_USER} -e MYSQL_PASSWORD=${DATABASE_PASSW} lucassabreu/openshift-mysql-test

docker run -d --name app-test -e DATABASE_CONNECTION=mysql://${DATABASE_USER}:${DATABASE_PASSW}@${DATABASE_HOST}:3306/${DATABASE_NAME} --link db-test:db -p 80:80 lucassabreu/openshift-app-test

