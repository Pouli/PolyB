# Select node VM
FROM node:5.11

#install Bower and Gulp globally
RUN npm i -g bower
RUN npm i -g gulp

# Create workdir
WORKDIR /app

# Add package.json, bower.json and .bowerrc to workdir
ADD package.json /app/package.json
ADD bower.json /app/bower.json
ADD .bowerrc /app/.bowerrc

# Install dependencies
RUN npm i
RUN bower i --allow-root

# Add all file/folder to workdir
ADD . /app

# Init ENV variable

# Expose port 3000
EXPOSE 3000

# Build front with Gulp default task
RUN gulp

# Run server
CMD ["node", "server/server.js"]