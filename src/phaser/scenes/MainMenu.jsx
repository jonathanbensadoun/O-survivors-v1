import { Scene } from 'phaser';
import ReactDOM from 'react-dom/client';
import DataManager from '../utils/DataManager';
import MainMenuApp from '../components/MainMenu/MainMenuApp';

/**
 * La scène du menu principal du jeu, affichée après l'écran de démarrage.
 * Permet au joueur de naviguer dans le menu principal, de régler les paramètres audio et de démarrer une nouvelle partie.
 */
export default class MainMenu extends Scene {
	constructor() {
		super('MainMenu');

		// Initialise l'état local pour gérer la visibilité des paramètres
		this.state = { isSettingsVisible: false };
	}

	/**
	 * Méthode appelée automatiquement lors de l'initialisation de la scène.
	 * Initialise les touches de curseur, récupère les données transmises par la scène précédente et charge les données des personnages.
	 * @param {Object} data - Les données transmises par la scène précédente.
	 *                        Contient les pièces du joueur et les personnages débloqués.
	 */
	async init(data) {
		// Initialisation des touches de curseur
		this.cursors = this.input.keyboard.createCursorKeys();

		// Récupère les données transmises depuis la scène précédente
		this.playerCoins = data.playerCoins;
		this.playerUnlockedCharacters = data.playerUnlockedCharacters;
		this.audioManager = data.audioManager;

		// Initialise le gestionnaire de données pour récupérer les données des personnages
		this.dataManager = new DataManager(this);
		this.charactersData = await this.dataManager.getAllCharactersData();
	}

	/**
	 * Méthode appelée automatiquement lors de la création de la scène.
	 * Initialise la musique du menu principal, affiche le menu principal et gère les interactions utilisateur.
	 */
	create() {
		// Crée la musique de fond et les effets sonores principaux
		this.audioManager.createMusic();
		this.audioManager.createrMainSoundEffect();

		// Récupère le conteneur du jeu et crée un conteneur pour le menu
		this.gameContainer = document.querySelector('.GameContainer');
		this.menuContainer = document.createElement('div');
		this.menuContainer.classList.add('main-menu-container');
		this.gameContainer.prepend(this.menuContainer);

		// Affiche les paramètres audio dans le menu principal à l'aide de React
		ReactDOM.createRoot(this.menuContainer).render(
			<MainMenuApp
				menuMusicVolume={this.audioManager.musicVolume * 100 || 50}
				menuSoundVolume={this.audioManager.soundVolume * 100 || 50}
				onStartGame={this.startGame}
				onVolumeChange={this.handleVolumeChange}
			/>
		);
	}

	/**
	 * Gère le changement de volume de la musique et des effets sonores.
	 * Met à jour les volumes et les paramètres audio du gestionnaire audio.
	 * @param {Object} volumes - Les nouveaux volumes de musique et d'effets sonores.
	 */
	handleVolumeChange = ({ musicVolume, soundVolume }) => {
		this.musicVolume = musicVolume;
		this.soundVolume = soundVolume;

		this.audioManager.setMusicVolume(this.musicVolume);
		this.audioManager.setSoundVolume(this.soundVolume);
	};

	/**
	 * Gère l'ouverture et la fermeture des paramètres.
	 * Change l'état de la visibilité des paramètres.
	 */
	toggleSeetings = () => {
		if (this.state.isSettingsVisible === false) {
			this.state.isSettingsVisible = true;
		} else {
			this.state.isSettingsVisible = false;
		}
	};

	/**
	 * Démarre le jeu lorsque le joueur clique sur "Démarrer".
	 * Joue un effet sonore de clic, supprime le menu principal et démarre la scène de sélection de personnage.
	 */
	startGame = () => {
		// Joue un effet sonore de clic avec le volume actuel
		this.sound.play('click1', { volume: this.audioManager.getSoundVolume() });

		// Supprime le conteneur du menu et démarre la scène du menu des personnages
		this.gameContainer.removeChild(this.menuContainer);
		this.scene.start('CharacterMenu', {
			audioManager: this.audioManager,
			charactersData: this.charactersData,
			playerUnlockedCharacters: this.playerUnlockedCharacters,
			playerCoins: this.playerCoins,
		});
	};
}
