FROM nodejs:v8
MAINTAINER Smartity team

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 8081
CMD [ "npm", "start" ]
