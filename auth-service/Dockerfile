############# BUILD STAGE #############

FROM node:20-alpine AS BuildStage

WORKDIR /app

COPY . .

RUN npm install typescript@5.4.5 && npm run build

############# MAIN STAGE #############

FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY --from=BuildStage /app/dist ./dist

EXPOSE 4001

CMD ["npm","start"]
