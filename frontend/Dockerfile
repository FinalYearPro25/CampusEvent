FROM node:18

WORKDIR /app

COPY . .

RUN npm config set legacy-peer-deps true

RUN npm install --ignore-platform

EXPOSE 3000

CMD [ "npm", "run", "dev" ]