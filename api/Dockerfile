########################
# Build Base
########################
FROM node:16-alpine3.16 AS build 
WORKDIR /app
COPY --chown=node:node ./package.json /app/


RUN npm install
COPY --chown=node:node . /app/

RUN npm run build

CMD ["node", "dist/main.js"]
