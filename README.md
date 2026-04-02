Profile 
Pour ajouter un nouveau attribut dans le profile :
a) public/app.js
Dans showDetail(index) :
Tu dois ajouter un <label> et <input> (ou <textarea>)

Dans saveCharacter(index) :
Tu dois récupérer la valeur du champ et l’ajouter à l’objet char avant de l’envoyer au backend

Dans createCharacter() :
Ajoute le champ par défaut à ton objet newChar

b) data/personnages/xxx.json
Chaque nouveau champ sera automatiquement sauvegardé dans le JSON quand tu feras saveCharacter()
Tu peux éditer tes JSON existants pour ajouter les champs vides si tu veux.