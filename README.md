# Projet d'admission à la DTY : PICTIONARY
Développé par Clément Bidan

## Description
Pictionary est un site internet qui permet à ses visiteurs de jouer au jeu pictionnary en quelques clics. Le créateur de la partie doit faire deviner des mots aux autres joueurs en les dessinant.

## Prérequis techniques

Git, Node 10, React JS, MongoDB, Socket.io, P5.js.

## Description technique

Le FrontEnd de ce projet a été réalisé avec React JS en utilisant bootstrap comme framework CSS.
Pour la partie backend, elle a été implémentée sur Node avec le framework Express. La BDD est du NoSQL sur MongoDB. L'authentification est assurée par utilisation d'un JWT token. La partie dessin utilise la librairie P5.JS et la partie temps réel a été développée avec Socket.io.

##Installation du projet

Commencez par cloner ce repository en utilisant la commande :
### `git clone https://github.com/clemdu32/pictionary.git`

Une fois dans le répertoire où vous souhaitez installer l'application entrer la commande:

### `npm install`

Vous pouvez désormais lancer l'application en mode développement en éxécutant.

### `npm start`

Ouvrez [http://localhost:3000](http://localhost:3000) pour visualiser l'application.

## Installation du backend et création de la BDD

### Création dB et ajout de données

Je suppose que vous avez installé MongoDB sur votre machine et que vous avez un serveur accessible via un url et un port.

Nous devons créer une base de données et y ajouter des données de test pour tester nos fonctionnalités. Celles-ci comprennent notamment des mots à faire deviner et des comptes utilisateurs.

Lancer un shell MongoDB et exécuter cette commande pour créer une DB pour notre jeu :

### `use DB_NAME`

Dans le même shell exécuter le fichier dbInitialization.js pour y ajouter des données en tapant:

### `load("/PATH_TO_FILE/dbInitialization.js")`

Aller dans le répertoire server et editer la ligne 20 du fichier server.js en renseignant l'adresse de votre DB sur le serveur MongoDB :

### `mongoose.connect('mongodb://*localhost:PORT/DB_NAME*', { useNewUrlParser: true, useUnifiedTopology: true })`

Par exemple sur ma machine c'était : 

### `mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })`

Vous pouvez désormais lancer l'api en éxécutant dans le répertoire server du projet : 

### `node server.js`

Vous pouvez maintenant vous connecter et/ou créer un compte et découvrir le jeu du pictionnary.

Email compte administrateur : admin@admin.fr <br>
Mot de passe : admin

Email compte utilisateur classique : joueur@joueur.fr <br>
Mot de passe : joueur