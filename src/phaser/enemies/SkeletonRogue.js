import Enemy from './Enemy';

/**
 * Classe représentant un voleur squelette, un type d'ennemi dans le jeu.
 * Les voleurs squelettes sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class SkeletonRogue extends Enemy {
	/**
	 * Crée un nouvel objet voleur squelette.
	 * @param {Phaser.Scene} scene - La scène à laquelle le voleur squelette appartient.
	 * @param {number} x - La position horizontale initiale du voleur squelette.
	 * @param {number} y - La position verticale initiale du voleur squelette.
	 * @param {string} texture - La texture à utiliser pour le voleur squelette.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le voleur squelette doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques au voleur squelette
		this.name = 'skeletonRogue'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement du voleur squelette
		this.health = 100; // Points de vie du voleur squelette
	}

	/**
	 * Met à jour l'état du voleur squelette à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
