import { Scene } from 'phaser';

import CollisionManager from '../utils/CollisionManager';
import UIManager from '../utils/UIManager';
import DataManager from '../utils/DataManager';
import GroupManager from '../utils/GroupManager';
import CameraManager from '../utils/CameraManager';
import WaveManager from '../utils/WaveManager';
import AninmsManager from '../utils/AnimsManager';
import InputManager from '../utils/InputManager';

/**
 * La scène principale du jeu où le gameplay se déroule.
 */
export default class Game extends Scene {
	constructor() {
		super('Game');

		this.enemiesKilled = 0;
		this.playerCoinsGained = 0;
	}

	/**
	 * Initialise les données transmises depuis la scène précédente.
	 * @param {object} data - Les données transmises depuis la scène précédente.
	 */
	init(data) {
		this.selectedWeapon = data.selectedWeapon;
		this.selectedCharacter = data.selectedCharacter;
		this.selectedMap = data.selectedMap;
		this.playerCoins = data.playerCoins;
		this.audioManager = data.audioManager;

		this.dataManager = new DataManager(this);
	}

	/**
	 * Crée les éléments visuels et les mécanismes de jeu.
	 */
	create() {
		// Création dynamique de la carte
		this.loadMap(this.selectedMap);

		// Création dynamimque du personnage
		this.character = this.loadCharacter(
			this.selectedCharacter,
			this.map.widthInPixels / 2 + 100,
			this.map.heightInPixels / 2 + 100
		).setDepth(1);

		// Création dynamique de l'arme
		this.loadWeapon(this.selectedWeapon);

		// Création des animations
		this.animsManager = new AninmsManager(this);
		this.animsManager.init();

		// Création de l'interface en jeu
		this.uiManager = new UIManager(this);
		this.uiManager.init();

		// Création des groupes
		this.groupManager = new GroupManager(this);
		this.groupManager.init();

		// Création des collisions
		this.collisionManager = new CollisionManager(this);
		this.collisionManager.init();

		// Création des sons et musiques
		this.audioManager.init();

		// Création de la caméra
		this.cameraManager = new CameraManager(this);
		this.cameraManager.init();

		// Création des vagues d'ennemis
		WaveManager.init(this);

		// Création des inputs
		this.inputManager = new InputManager(this);
		this.inputManager.init();
	}

	/**
	 * Met à jour le jeu à chaque frame.
	 * @param {number} time - Le temps écoulé depuis le début du jeu.
	 */
	update(time) {
		// Mise à jour de la barre d'xp
		this.uiManager.updateXPBar();

		// Mise à joue de la barre de vie
		this.uiManager.updateHealthBar();

		// Mise à jour du personnage
		this.character.update();

		// Mise à jour de tous les ennemis
		this.enemies.getChildren().forEach((enemy) => {
			enemy.update();
		});

		// Mise à jour de l'auto attaque
		this.weapon.handleAutoAttack(time);
		// this.handleAutoAttack(time);

		this.audioManager.update();
	}

	/**
	 * Charge un personnage dans le jeu.
	 * @param {object} Character - La classe du personnage à charger.
	 * @param {number} x - La position horizontale du personnage sur la carte.
	 * @param {number} y - La position verticale du personnage sur la carte.
	 * @returns {object} - Le personnage chargé.
	 */
	loadCharacter(Character, x, y) {
		return new Character(this, x, y);
	}

	/**
	 * Charge la carte du jeu.
	 * @param {object} Map - La classe de la carte à charger.
	 */
	loadMap(Map) {
		this.map = new Map(this);
		this.map.create();
	}

	/**
	 * Charge l'arme du joueur dans le jeu.
	 * @param {object} Weapon - La classe de l'arme à charger.
	 */
	loadWeapon(Weapon) {
		this.weapon = new Weapon(this);
	}

	/**
	 * Gère la mort du joueur dans le jeu.
	 */
	handlePlayerDeath() {
		// Arrête le mouvement du personnage
		this.character.setVelocity(0, 0);

		// Arrête tous les sons et musiques en cours
		this.audioManager.stopAllMusics();

		// Joue le son de fin de jeu
		this.sound.play('game-over', {
			volume: this.audioManager.getSoundVolume(),
		});

		// Lance la scène de Game Over une fois que l'animation de mort du personnage est terminée
		this.character.once('animationcomplete', () => {
			this.scene.start('GameOver', {
				character: this.character,
				stage: this.selectedMap,
				survivedTime: this.survivedTime,
				coinsGained: this.playerCoinsGained,
				enemiesDefeated: this.enemiesKilled,
			});
		});

		// Enregistre le temps de survie du joueur
		this.survivedTime = this.timeText;

		// Met à jour les pièces du joueur dans la base de données
		this.updateUserCoins();
	}

	/**
	 * Met à jour le nombre de pièces du joueur dans la base de données.
	 */
	updateUserCoins() {
		// Vérifie si le nombre de pièces du joueur est défini
		if (this.playerCoins !== undefined) {
			// Calcule le nombre total de pièces du joueur (pièces gagnées pendant la partie + pièces déjà possédées)
			const updatedCoins = this.playerCoinsGained + this.playerCoins;

			// Met à jour le nombre de pièces dans la base de données via le gestionnaire de données
			this.dataManager.updateOwnedCoins(updatedCoins);
		}
	}
}
