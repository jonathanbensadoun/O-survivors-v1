# Guide d'Utilisation de Phaser et Architecture du Jeu

 Voici un petit guide sur l'utilisation de Phaser, ainsi qu'un aperçu de l'architecture du jeu que nous avons mise en place.

## Utilisation de Phaser

### Fonctionnalités Clés
- **Scènes :** Nous utilisons les scènes Phaser pour diviser logiquement notre jeu en différentes parties, telles que le menu principal, le niveau de jeu, l'écran de pause, etc.
- **Sprites et Animation :** Les sprites sont utilisés pour représenter les personnages, les objets et les ennemis dans notre jeu. Nous animons ces sprites en définissant des animations pour différentes actions.
- **Physique :** Le moteur de physique intégré de Phaser nous permet de simuler le mouvement et les collisions des objets dans notre jeu.
- **Contrôles Utilisateur :** Nous gérons les entrées utilisateur telles que les touches du clavier, les clics de souris et les touches tactiles pour permettre aux joueurs d'interagir avec notre jeu.

## Architecture du Jeu

### Organisation des Classes
Nous avons organisé les différentes fonctionnalités de notre jeu en classes distinctes. Par exemple, nous avons une classe `Player` pour gérer le personnage joueur, une classe `Enemy` pour gérer les ennemis, etc.

### Gestionnaires
Nous utilisons des gestionnaires pour regrouper des fonctionnalités similaires et simplifier leur gestion. Par exemple, le `InputManager` gère les entrées utilisateur, tandis que le `GroupManager` gère les groupes d'objets tels que les ennemis et les loots.

### Gestion des Données
Pour gérer la récupération et la mise à jour des données du jeu, telles que les pièces et les personnages débloqués, nous avons créé une classe `DataManager`.

### Gestion des Vagues
Nous avons mis en place un `WaveManager` pour gérer le spawn des ennemis par vagues, en utilisant le moteur de temps de Phaser pour déclencher les événements de spawn à intervalles réguliers.

### Interactions
Nous avons également mis en place des mécanismes d'interaction entre les différents éléments du jeu, tels que les collisions entre le personnage et les ennemis, la collecte de butin, etc.

## Conclusion
Voilà pour un bref aperçu de notre utilisation de Phaser et de l'architecture de notre jeu !

