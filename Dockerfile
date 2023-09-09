FROM node:lts-alpine
WORKDIR /usr/src/app

RUN corepack enable

COPY \
  ./package.json \
  ./pnpm-lock.yaml \
  ./tsconfig.json \
  ./

RUN pnpm i

COPY . .
RUN pnpm build
ENTRYPOINT ["node", "."]
