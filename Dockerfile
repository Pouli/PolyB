# Selection de la VM node
 FROM node:5.11

 # Création du dossier de travail
 WORKDIR /app

 # Ajout des package.json
 ADD package.json /app/package.json

 ADD server/package.json /app/server/package.json

 # Installation des dépendances
 RUN npm i

 # Ajout de l'app
 ADD . /app

 # Initialisatioin des variables d'environnement

 # Exposition du port 3000
 EXPOSE 3000

 # Creation du build front avec Webpack
 RUN npm run build

 # On lance le serveur
 CMD ["node", "server/server.js"]