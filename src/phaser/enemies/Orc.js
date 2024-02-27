import Enemy from './Enemy';

/**
 * Classe représentant un orc, un type d'ennemi dans le jeu.
 * Les orcs sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class Orc extends Enemy {
	/**
	 * Crée un nouvel objet orc.
	 * @param {Phaser.Scene} scene - La scène à laquelle l'orc appartient.
	 * @param {number} x - La position horizontale initiale de l'orc.
	 * @param {number} y - La position verticale initiale de l'orc.
	 * @param {string} texture - La texture à utiliser pour l'orc.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que l'orc doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques à l'orc
		this.name = 'orc'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement de l'orc
		this.health = 100; // Points de vie de l'orc
	}

	/**
	 * Met à jour l'état de l'orc à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
