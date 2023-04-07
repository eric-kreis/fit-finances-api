###############################
# BUILD FOR LOCAL DEVELOPMENT #
###############################
FROM node:18-alpine as development

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node prisma ./prisma

RUN yarn

COPY --chown=node:node . .

USER node

########################
# BUILD FOR PRODUCTION #
########################
FROM node:18-alpine as build

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node prisma ./prisma

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --production && yarn cache clean

USER node

##############
# PRODUCTION #
##############
FROM node:18-alpine as production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "./dist/main.js" ]
