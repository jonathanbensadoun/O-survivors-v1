import { Scene } from 'phaser';
import ReactDOM from 'react-dom/client';
import GameOverApp from '../components/GameOver/GameOverApp';

/**
 * La scène affichée lorsque le joueur meurt dans le jeu.
 */
export default class GameOver extends Scene {
	constructor() {
		super('GameOver');
	}

	/**
	 * Initialise les données de la scène.
	 * @param {object} data - Les données transmises à la scène.
	 */
	init(data) {
		// Initialise les variables avec les données transmises
		this.selectedMap = data.stage.name;
		this.character = data.character;
		// eslint-disable-next-line no-underscore-dangle
		this.survivedTime = data.survivedTime._text;
		this.coinsGained = data.coinsGained;
		this.enemiesDefeated = data.enemiesDefeated;
	}

	/**
	 * Crée les éléments visuels de la scène.
	 */
	create() {
		// Crée les touches de curseur
		this.cursors = this.input.keyboard.createCursorKeys();

		// Crée un conteneur DOM pour le menu
		this.gameContainer = document.querySelector('.GameContainer');
		this.menuContainer = document.createElement('div');
		this.menuContainer.classList.add('main-menu-container');
		this.gameContainer.prepend(this.menuContainer);

		// Rend le composant GameOverApp à l'aide de ReactDOM
		ReactDOM.createRoot(this.menuContainer).render(
			<GameOverApp
				stageName={this.selectedMap}
				survivedTime={this.survivedTime}
				coinsGained={this.coinsGained}
				levelReached={this.character.level}
				enemiesDefeated={this.enemiesDefeated}
				onBackToMenu={this.goBackToMenu}
			/>
		);
	}

	/**
	 * Fonction pour revenir au menu principal lorsque le joueur appuie sur un bouton.
	 */
	goBackToMenu = () => {
		// Supprime le conteneur du menu
		this.gameContainer.removeChild(this.menuContainer);

		// Arrête la scène de GameOver et démarre la scène du menu principal
		this.scene.stop('GameOver');
		this.scene.start('MainMenu');
	};
}
