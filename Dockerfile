FROM mhart/alpine-node:5.10

WORKDIR /src

COPY package.json /src/
RUN npm install
COPY . /src/

CMD ["npm", "start"]
