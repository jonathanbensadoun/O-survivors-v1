import createCharacterAnims from '../anims/characterAnims';
import createEnemyAnims from '../anims/enemyAnims';
import createWeaponAnims from '../anims/weaponAnims';

/**
 * Gestionnaire des animations du jeu.
 */
export default class AninmsManager {
	/**
	 * Crée une instance du gestionnaire des animations.
	 * @param {Phaser.Scene} scene - La scène à laquelle le gestionnaire des animations est associé.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Initialise les animations des personnages, des ennemis et des armes.
	 */
	init() {
		// Initialiser les animations des personnages
		createCharacterAnims(this.scene.anims, this.scene.character.name);

		// Initialiser les animations des ennemis
		createEnemyAnims(this.scene.anims);

		// Initialiser les animations des armes
		createWeaponAnims(this.scene.anims);
	}
}
