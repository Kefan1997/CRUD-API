FROM node:20-alpine

USER node

RUN mkdir /home/node/crud-api

WORKDIR /home/node/crud-api

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node dist/ .
COPY --chown=node:node users.json .

CMD ["node", "index.js"]