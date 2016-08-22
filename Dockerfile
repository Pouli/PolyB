FROM node:6.4

WORKDIR /app

ADD package.json /app/package.json
ADD bower.json /app/bower.json
ADD .bowerrc /app/.bowerrc

RUN npm run dep-install

ADD . /app

EXPOSE 3000

CMD ["npm", "start"]