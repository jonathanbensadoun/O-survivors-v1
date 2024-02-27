import Phaser from 'phaser';

/**
 * Classe représentant une pièce de monnaie, un objet de butin dans le jeu.
 * Les pièces de monnaie sont collectées par le joueur pour gagner des récompenses.
 */
export default class LootCoin extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Crée un nouvel objet pièce de monnaie.
	 * @param {Phaser.Scene} scene - La scène à laquelle la pièce de monnaie appartient.
	 * @param {number} x - La position horizontale initiale de la pièce de monnaie.
	 * @param {number} y - La position verticale initiale de la pièce de monnaie.
	 * @param {string} texture - La texture à utiliser pour la pièce de monnaie.
	 */
	constructor(scene, x, y, texture) {
		// Appelle le constructeur de la classe parent (Phaser.Physics.Arcade.Sprite)
		super(scene, x, y, texture);

		// Ajoute la pièce de monnaie à la scène et à la physique
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Initialisation des propriétés de la pièce de monnaie
		this.coinIncrease = 1; // Montant d'augmentation du compteur de pièces de monnaie lorsqu'elle est collectée
	}

	/**
	 * Augmente le compteur de pièces de monnaie et met à jour l'affichage.
	 */
	increaseCoinCount() {
		// Incrémente le compteur de pièces de monnaie du joueur
		this.scene.playerCoinsGained += 1;
		// Met à jour l'affichage du compteur de pièces de monnaie
		this.updateCoinCounter();
	}

	/**
	 * Met à jour l'affichage du compteur de pièces de monnaie dans la scène.
	 */
	updateCoinCounter() {
		// Met à jour le texte du compteur de pièces de monnaie dans la scène avec la nouvelle valeur
		this.scene.coinCounterText.setText(`${this.scene.playerCoinsGained}`);
	}
}
