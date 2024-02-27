import Enemy from './Enemy';

/**
 * Classe représentant un chaman orc, un type d'ennemi dans le jeu.
 * Les chamans orcs sont des ennemis avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class OrcShaman extends Enemy {
	/**
	 * Crée un nouvel objet chaman orc.
	 * @param {Phaser.Scene} scene - La scène à laquelle le chaman orc appartient.
	 * @param {number} x - La position horizontale initiale du chaman orc.
	 * @param {number} y - La position verticale initiale du chaman orc.
	 * @param {string} texture - La texture à utiliser pour le chaman orc.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que le chaman orc doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques au chaman orc
		this.name = 'orcShaman'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement du chaman orc
		this.health = 100; // Points de vie du chaman orc
	}

	/**
	 * Met à jour l'état du chaman orc à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
