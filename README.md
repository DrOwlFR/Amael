# Amaël

Amaël est un bot français pour les personnes souhaitants quelque chose de rapide pour gérer leurs personnages. Vous avez la possibilité de créer les personnages avec leurs noms, leurs classes, et leur vie; et le MJ a la possibilité d'ajouter ou d'enlever de la vie aux personnages grâce aux boutons sous les fiches de personnages.

Ce bot utilise le framework [sheweny](https://sheweny.js.org/) afin de simplifier son utilisation et les modifications pour les utilisateurs.

## Commands

### JDR

| Nom             | Description                                         | Sous-commandes | Utilisation                 | Cd     |
| --------------- | --------------------------------------------------- | -------------- | --------------------------- | ------ |
| charactercard   | Envoie la carte du personnage.                      | Aucune         | [nom]                       | 3secs  |
| createcharacter | Crée le fiche du personnage.                        | Aucune         | [nom] [race] [classe] [vie] | 3secs  |
| deletecharacter | Supprime un personnage de la base de données.       | Aucune         | [nom]                       | 3secs  |
| roll            | Jète un ou plusieurs dès du nombre de faces désiré. | Aucune         | [faces] \<nombreDeRoll>     | 3secs  |

### Misc

| Nom             | Description                                                            | Sous-commandes | Utilisation                 | Cd     |
| --------------- | ---------------------------------------------------------------------- | -------------- | --------------------------- | ------ |
| help            | Affiche la liste des commandes, ou de l'aide sur une commande précise. | Aucune         | \<commande>                 | 3secs  |
| ping            | Renvoie pong et affiche la latence du bot.                             | Aucune         | Aucun particulier           | 3secs  |

## Comment l'installer

1. Cloner la repo.
2. Renommer le fichier `config.template.js` — il est situé dans `src/structures` — en `config.js` et mettre votre token.
3. Renommer le fichier `charactersData.template.json` — situé dans `src/structures` — en `charactersData.json`.
3. Installer les dépendences : `npm install`.
4. Démarrer le bot : `node .\src\index.js`.


## Modifications des races et des classes

Il vous est également possible d'ajouter, d'enlever, ou de renommer les races et les classes. Pour ce faire :
1. Aller dans le fichier `createcharacter.js` situé dans `src/commands/JDR`.
2. Chercher les options `race` et `classe`.
3. À l'intérieur de ces options vous avez une key `choices`, vous pouvez rajouter, enlever, ou renommer des lignes en suivant la même typo que celle déjà présente.
4. Sauvegarder le fichier.
5. Relancer le bot : `node .\src\index.js`.

*Il vous est également possible de modifier les statistiques.*