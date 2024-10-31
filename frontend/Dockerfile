FROM node:18

WORKDIR /app

COPY . .

RUN npm config set legacy-peer-deps true

RUN npm install --ignore-platform

EXPOSE 3000

# RUN npm run build

CMD [ "npm", "run", "dev" ]
# CMD [ "serve", "-s", "dist" ]

# CMD [ "npm", "start" ]