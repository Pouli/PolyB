# Selection de la VM node
FROM node:5.11

#install Bower
RUN npm i -g bower
RUN npm i -g gulp

# Création du dossier de travail
WORKDIR /app

# Ajout des package.json
ADD package.json /app/package.json
ADD bower.json /app/bower.json
ADD .bowerrc /app/.bowerrc

# Installation des dépendances
RUN npm i
RUN bower i --allow-root

# Ajout de l'app
ADD . /app

# Initialisatioin des variables d'environnement

# Exposition du port 3000
EXPOSE 3000

# Creation du build front avec Gulp
RUN gulp

# On lance le serveur
CMD ["node", "server/server.js"]