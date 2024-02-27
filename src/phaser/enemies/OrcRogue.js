import Enemy from './Enemy';

/**
 * Classe représentant un orc rogue, un type spécifique d'ennemi dans le jeu.
 * Les orcs rogues sont des ennemis agiles avec des caractéristiques spécifiques et des comportements de combat.
 */
export default class OrcRogue extends Enemy {
	/**
	 * Crée un nouvel objet orc rogue.
	 * @param {Phaser.Scene} scene - La scène à laquelle l'orc rogue appartient.
	 * @param {number} x - La position horizontale initiale de l'orc rogue.
	 * @param {number} y - La position verticale initiale de l'orc rogue.
	 * @param {string} texture - La texture à utiliser pour l'orc rogue.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que l'orc rogue doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		// Appelle le constructeur de la classe parent (Enemy)
		super(scene, x, y, texture, character);

		// Propriétés spécifiques à l'orc rogue
		this.name = 'orcRogue'; // Nom de l'ennemi
		this.speed = 50; // Vitesse de déplacement de l'orc rogue
		this.health = 100; // Points de vie de l'orc rogue
	}

	/**
	 * Met à jour l'état de l'orc rogue à chaque frame.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	update(scene) {
		// Appelle la méthode update de la classe parent (Enemy) pour gérer le comportement générique de l'ennemi
		super.update(scene);
	}
}
