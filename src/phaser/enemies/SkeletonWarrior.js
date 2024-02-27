import Enemy from './Enemy';

/**
 * Classe représentant un guerrier squelette, un type d'ennemi dans le jeu.
 * Les guerriers squelettes sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class SkeletonWarrior extends Enemy {
	/**
	 * Crée un nouvel objet guerrier squelette.
	 * @param {Phaser.Scene} scene - La scène à laquelle le guerrier squelette appartient.
	 * @param {number} x - La position horizontale initiale du guerrier squelette.
	 * @param {number} y - La position verticale initiale du guerrier squelette.
	 * @param {string} texture - La texture à utiliser pour le guerrier squelette.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le guerrier squelette doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques au guerrier squelette
		this.name = 'skeletonWarrior'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement du guerrier squelette
		this.health = 100; // Points de vie du guerrier squelette
	}

	/**
	 * Met à jour l'état du guerrier squelette à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
