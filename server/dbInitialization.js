words = [
  {word : "voiture"},
  {word : "chat"},
  {word : "chien"},
  {word : "camion"},
  {word : "carte"},
  {word : "boussole"},
  {word : "ordinateur"},
  {word : "pull"},
  {word : "arbre"},
  {word : "nuage"},
  {word : "ciel"},
  {word : "vigne"},
  {word : "soleil"},
  {word : "canapé"}
]

users = [
    { "email" : "admin@admin.fr",
      "pwd" : "admin",
      "pseudo" : "admin",
      "isAdmin" : true
    },
    {
      "email" : "joueur@joueur.fr",
      "pwd" : "joueur",
      "pseudo" : "joueur",
      "isAdmin" : false
    }
  ]

for( var k = 0; k < words.length; k++){
  db.words.insert(words[k]);
}

for( var k = 0; k < users.length; k++){
  db.users.insert(users[k]);
}
