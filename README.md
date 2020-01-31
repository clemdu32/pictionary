#Projet d'admission à la DTY : PICTIONARY
Développé par Clément Bidan

## Description
Pictionary est un site internet qui permet à ses visiteurs de jouer au jeu pictionnary en quelques clics. Le créateur de la partie doit faire deviner des mots aux autres joueurs en les dessinant.

##Prérequis techniques
Git, Node 10, React JS, MongoDB, Socket.io, P5.js.

##Description technique
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

Allez dans le répertoire server et editez la ligne 20 du fichier server.js en renseignant l'adresse de votre BDD MongoDB :

### `mongoose.connect('mongodb://*your database location*', { useNewUrlParser: true, useUnifiedTopology: true })`

Par exemple pour moi c'est : 

### `mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })`

Chargez les données de test qui comprennent un liste de mots, un compte utilisateur classique et un compte administrateur.

### `à voir`

Vous pouvez désormais lancer l'api en éxécutant : 

### `node server.js`

Vous pouvez maintenant vous connecter et/ou créer un compte et découvrir le jeu du pictionnary.

Email compte administrateur : admin@admin.fr <br>
Mot de passe : admin

Email compte utilisateur classique : joueur@joueur.fr <br>
Mot de passe : joueur

