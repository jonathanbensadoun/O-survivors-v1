/**
 * Gestionnaire de la caméra du jeu.
 */
export default class CameraManager {
	/**
	 * Crée une instance du gestionnaire de la caméra.
	 * @param {Phaser.Scene} scene - La scène à laquelle le gestionnaire de la caméra est associé.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Initialise la caméra en suivant le personnage principal et en ajustant le zoom.
	 */
	init() {
		// Définition de la caméra principale de la scène
		this.scene.camera = this.scene.cameras.main;

		// Suivi du personnage principal
		this.scene.camera.startFollow(this.scene.character, true);

		// Définition du niveau de zoom de la caméra
		this.scene.camera.setZoom(1.5);
	}
}
