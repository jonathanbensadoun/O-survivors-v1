import { Scene } from 'phaser';
import ReactDOM from 'react-dom/client';
import PauseApp from '../components/Pause/PauseApp';

/**
 * Classe représentant la scène de pause du jeu.
 */
export default class Pause extends Scene {
	constructor() {
		super('Pause');
	}

	/**
	 * Initialise la scène de pause avec les données de la scène de jeu.
	 * @param {object} data - Les données passées depuis la scène de jeu.
	 */
	init(data) {
		this.gameScene = data.this;
	}

	/**
	 * Crée la scène de pause.
	 */
	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.gameContainer = document.querySelector('.GameContainer');
		this.menuContainer = document.createElement('div');
		this.menuContainer.classList.add('secondaryMenu-container');
		this.gameContainer.prepend(this.menuContainer);

		// Affiche l'interface de pause
		ReactDOM.createRoot(this.menuContainer).render(
			<PauseApp
				menuMusicVolume={this.gameScene.audioManager.musicVolume * 100}
				menuSoundVolume={this.gameScene.audioManager.soundVolume * 100}
				onQuit={this.handleQuitClickBtn}
				onBack={this.handleBackClickBtn}
				onVolumeChange={this.handleVolumeChange}
			/>
		);

		// Gestion de la touche ESC pour quitter la pause
		this.input.keyboard.on('keydown-ESC', () => {
			this.gameContainer.removeChild(this.menuContainer);
			this.scene.resume('Game');
			this.scene.stop('Pause');
		});

		// this.displayPauseText();
	}

	/**
	 * Gère le changement de volume de la musique et des effets sonores.
	 * @param {object} volumeData - Les données de volume.
	 * @param {number} volumeData.musicVolume - Le volume de la musique.
	 * @param {number} volumeData.soundVolume - Le volume des effets sonores.
	 */
	handleVolumeChange = ({ musicVolume, soundVolume }) => {
		// Définit le niveau de volume de la musique
		this.gameScene.audioManager.musicVolume = musicVolume;
		// Définit le niveau de volume des effets sonores
		this.gameScene.audioManager.soundVolume = soundVolume;

		// Définit le volume de la musique
		this.gameScene.audioManager.setMusicVolume(musicVolume);
		// Définit le volume des effets sonores
		this.gameScene.audioManager.setSoundVolume(soundVolume);
	};

	/**
	 * Gère le clic sur le bouton "Quitter".
	 */
	handleQuitClickBtn = () => {
		// Arrête toute la musique du jeu
		this.gameScene.audioManager.stopAllMusics();

		// Supprime l'interface de pause
		this.gameContainer.removeChild(this.menuContainer);

		// Arrête la scène de jeu
		this.scene.stop('Game');

		// Démarre la scène du menu principal
		this.scene.start('MainMenu');
	};

	/**
	 * Gère le clic sur le bouton "Retour".
	 */
	handleBackClickBtn = () => {
		// Supprime l'interface de pause
		this.gameContainer.removeChild(this.menuContainer);

		// Reprend la scène de jeu
		this.scene.resume('Game');

		// Arrête la scène de pause
		this.scene.stop('Pause');
	};
}
