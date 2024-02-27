import { Scene } from 'phaser';

/**
 * La scène de démarrage du jeu, chargée en premier pour initialiser le jeu.
 * Elle charge les ressources nécessaires avant de passer à la scène de préchargement.
 */
export default class Boot extends Scene {
	constructor() {
		super('Boot');
	}

	/**
	 * Méthode de préchargement appelée automatiquement par Phaser.
	 * Charge les ressources nécessaires pour le préchargement, comme le fond d'écran, le logo, les sons, etc.
	 */
	preload() {
		// Charge l'image de fond
		this.load.image('background', 'assets/ui/startMenu/start-menu-bg.jpg');

		// Charge l'image du logo
		this.load.image('logo-text', 'assets/ui/startMenu/logo-text.png/');

		// Charge le son du démarrage
		this.load.audio('press-start-sound', [
			'assets/audio/menu/octave-beeps-going-up-2.m4a',
		]);
	}

	/**
	 * Méthode appelée automatiquement par Phaser une fois que le préchargement est terminé.
	 * Démarre la scène de préchargement.
	 */
	create() {
		// Démarre la scène de préchargement
		this.scene.start('Preloader');
	}
}
