import Enemy from './Enemy';

/**
 * Classe représentant un squelette, un type d'ennemi dans le jeu.
 * Les squelettes sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class Minotaur extends Enemy {
	/**
	 * Crée un nouvel objet squelette.
	 * @param {Phaser.Scene} scene - La scène à laquelle le squelette appartient.
	 * @param {number} x - La position horizontale initiale du squelette.
	 * @param {number} y - La position verticale initiale du squelette.
	 * @param {string} texture - La texture à utiliser pour le squelette.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le squelette doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		this.body.setSize(this.width * 2, this.height * 2);

		// Propriétés spécifiques au squelette
		this.name = 'minotaur'; // Nom de l'ennemi
		this.speed = 85; // Vitesse de déplacement du squelette
		this.health = 1000; // Points de vie du squelette
		this.setPushable(false);
	}

	/**
	 * Met à jour l'état du squelette à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
