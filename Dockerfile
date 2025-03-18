FROM node:20-alpine

USER node

RUN mkdir /home/node/crud-api

WORKDIR /home/node/crud-api

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node dist/ .
COPY --chown=node:node src/mocks/ ./src/mocks

CMD ["node", "index.js"]