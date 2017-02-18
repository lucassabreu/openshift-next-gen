FROM node:7.5.0-alpine

COPY ./ /app/src/

RUN cd /app/src/frontend && npm install && npm run build && \
    cd /app/src/backend && rm ./public && mv ../frontend/build ./public && \
    rm -rf ../frontend && npm install --production 

WORKDIR /app/src/backend

CMD ["/app/src/backend/cli/entrypoint.sh"]
