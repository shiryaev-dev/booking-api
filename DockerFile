FROM node:16-alpine
WORKDIR /opt/app
RUN apk add nano
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
# RUN rm -rf ./src/ && rm -rf ./test/
CMD ["node", "./dist/main.js"]