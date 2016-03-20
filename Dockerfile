FROM myprod/gulp

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
RUN npm install  && npm install bower -g  && bower install --allow-root 

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD [ "gulp", "serve" ]
