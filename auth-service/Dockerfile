FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm ci --only=prod

COPY . .

# command tsc only available with typescript dependecy , with --only=production this could lead to a failure
RUN npm run build 

CMD ["npm","start"]