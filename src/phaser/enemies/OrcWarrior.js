import Enemy from './Enemy';

/**
 * Classe représentant un guerrier orc, un type d'ennemi dans le jeu.
 * Les guerriers orcs sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class OrcWarrior extends Enemy {
	/**
	 * Crée un nouvel objet guerrier orc.
	 * @param {Phaser.Scene} scene - La scène à laquelle le guerrier orc appartient.
	 * @param {number} x - La position horizontale initiale du guerrier orc.
	 * @param {number} y - La position verticale initiale du guerrier orc.
	 * @param {string} texture - La texture à utiliser pour le guerrier orc.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le guerrier orc doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques au guerrier orc
		this.name = 'orcWarrior'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement du guerrier orc
		this.health = 100; // Points de vie du guerrier orc
	}

	/**
	 * Met à jour l'état du guerrier orc à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
