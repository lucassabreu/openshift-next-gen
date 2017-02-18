#!/bin/sh
if [[ "$ENV" = "DEV" ]]; then
    npm install
    exec node_modules/.bin/node-supervisor index.js
else
    exec node index.js
fi
