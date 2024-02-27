import Phaser from 'phaser';

export default class LootXP extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Classe représentant un objet de gain d'expérience, un objet de butin dans le jeu.
	 * Les objets de gain d'expérience sont collectés par le joueur pour augmenter son expérience.
	 */
	constructor(scene, x, y, texture) {
		/**
		 * Crée un nouvel objet de gain d'expérience.
		 * @param {Phaser.Scene} scene - La scène à laquelle l'objet de gain d'expérience appartient.
		 * @param {number} x - La position horizontale initiale de l'objet de gain d'expérience.
		 * @param {number} y - La position verticale initiale de l'objet de gain d'expérience.
		 * @param {string} texture - La texture à utiliser pour l'objet de gain d'expérience.
		 */
		super(scene, x, y, texture);
		// Appelle le constructeur de la classe parent (Phaser.Physics.Arcade.Sprite)

		// Ajoute l'objet de gain d'expérience à la scène et à la physique
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Initialisation des propriétés de l'objet de gain d'expérience
		this.xpIncrease = 35; // Montant d'augmentation de l'expérience du joueur lorsqu'il est ramassé
	}

	/**
	 * Applique l'effet de gain d'expérience au joueur.
	 * @param {Player} player - Le joueur à qui appliquer le gain d'expérience.
	 */
	xpEffect(player) {
		// Applique le gain d'expérience au joueur en utilisant la méthode gainXP de la classe Player
		player.gainXP(this.xpIncrease);
	}
}
