import Phaser from 'phaser';

/**
 * Classe représentant un objet de soin, un objet de butin dans le jeu.
 * Les objets de soin sont collectés par le joueur pour augmenter sa santé.
 */
export default class LootPV extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Crée un nouvel objet de soin.
	 * @param {Phaser.Scene} scene - La scène à laquelle l'objet de soin appartient.
	 * @param {number} x - La position horizontale initiale de l'objet de soin.
	 * @param {number} y - La position verticale initiale de l'objet de soin.
	 * @param {string} texture - La texture à utiliser pour l'objet de soin.
	 */
	constructor(scene, x, y, texture) {
		// Appelle le constructeur de la classe parent (Phaser.Physics.Arcade.Sprite)
		super(scene, x, y, texture);

		// Ajoute l'objet de soin à la scène et à la physique
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Initialisation des propriétés de l'objet de soin
		this.pvIncrease = 10; // Montant d'augmentation de la santé du joueur lorsqu'il est ramassé
	}

	/**
	 * Applique l'effet de soin au joueur et détruit l'objet de soin.
	 * @param {Player} player - Le joueur à soigner.
	 */
	healEffect(player) {
		// Augmente la santé du joueur en utilisant la méthode heal de la classe Player
		player.heal(this.pvIncrease);

		// Détruit l'objet de soin une fois qu'il a été ramassé
		this.destroy();
	}
}
