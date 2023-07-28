FROM node:16

USER node

WORKDIR /usr/src/api

CMD ["npm", "run", "start:dev"]