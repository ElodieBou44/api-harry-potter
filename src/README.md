# Site web statique utilisant une API

## Description

-   Création d'une base de données en ligne à partir d'un jeu de données disponibles en libre accès
-   Permettre aux utilisateur·rices de trier, filtrer et effectuer des recherches parmi le contenu qui s'y trouve.

## Fonctionnalités

-   _Afficher dynamiquement_ les données issues de l'API à l'aide de fetch(), avec choix d'affichage en grille ou en liste.
-   Permettre aux utilisateur·rices de _trier les données_ du site Web selon 2 propriétés (nom ascendant / descendant et date de naissance ascendante / descendante), une à la fois.
-   Permettre aux utilisateur·rices d'_appliquer un filtre_ (selon la maison ou les origines), les filtres sont générés dynamiquement, d'enlever les filtres sans avoir à recharger la page et d'avoir un retour visuel qui affiche la valeur des filtres (dans l'URL).
-   Permettre aux utilisateur·rices d'_effectuer une recherche_ flexible (la casse est ignorée) dans les données sur 3 propriétés, ainsi que d'annuler la recherche sans avoir à rafraîchir la page.

## Jeu de données

Vous êtes libre de choisir votre propre jeu de données, à condition que celui-ci respectent certains critères :

-   Le jeu de donnée doit être en format JSON.
-   Il doit contenir au moins 10 valeurs, chacune ayant au moins 5 propriétés.
-   L'accès au jeu de données ne doit pas nécessiter d'authentification.
-   Le jeu de donnée doit permettre le partage des ressources entre origines multiples (CORS).
-   Puisque le même jeu de données sera utilisé pour le TP2, celui-ci doit être disponible en ligne via une requête `fetch()`. Autrement dit, les données JSON doivent être accessibles directement depuis un URL. Par exemple : https://fakestoreapi.com/products.

Vous trouverez un répertoire de jeux de données disponibles en libre accès à l'adresse suivante : https://github.com/public-apis/public-apis. Assurez-vous que le jeu de données que vous choisissez respecte les critères ci-haut.
