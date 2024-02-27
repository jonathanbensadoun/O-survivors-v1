import Enemy from './Enemy';

/**
 * Classe représentant un mage squelette, un type d'ennemi dans le jeu.
 * Les mages squelettes sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class SkeletonMage extends Enemy {
	/**
	 * Crée un nouvel objet mage squelette.
	 * @param {Phaser.Scene} scene - La scène à laquelle le mage squelette appartient.
	 * @param {number} x - La position horizontale initiale du mage squelette.
	 * @param {number} y - La position verticale initiale du mage squelette.
	 * @param {string} texture - La texture à utiliser pour le mage squelette.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le mage squelette doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques au mage squelette
		this.name = 'skeletonMage'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement du mage squelette
		this.health = 100; // Points de vie du mage squelette
	}

	/**
	 * Met à jour l'état du mage squelette à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
