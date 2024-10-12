FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript ts-node nodemon
COPY tsconfig.json .
COPY . .
EXPOSE 8050
CMD ["npm", "start"]