/**
 * Gestionnaire des sons et musiques du jeu.
 */
export default class AudioManager {
	/**
	 * Crée une instance du gestionnaire des sons et musiques.
	 * @param {Phaser.Scene} scene - La scène à laquelle le gestionnaire des sons et musiques est associé.
	 */
	constructor(scene) {
		this.scene = scene;

		// Volume de la musique par défaut
		this.musicVolume = 0.5;
		// Volume des effets sonores par défaut
		this.soundVolume = 0.5;
	}

	/**
	 * Initialise les musiques et les effets sonores du jeu.
	 */
	init() {
		this.createMusic();
		this.createGameOverSoundEffect();
		this.createGameSoundEffect();
		this.playRandomMusic();
	}

	/**
	 * Met à jour le volume de la musique en fonction du volume défini.
	 */
	update() {
		this.scene.musics.forEach((music) => {
			// La fonction setVolume() prend un volume entre 0 et 1
			music.setVolume(this.musicVolume * 0.1);
		});
	}

	/**
	 * Crée les différentes musiques du jeu.
	 */
	createMusic() {
		this.scene.musics = [];

		this.scene.music1 = this.scene.sound.add('music1');
		this.scene.music2 = this.scene.sound.add('music2');
		this.scene.music3 = this.scene.sound.add('music3');

		this.scene.musics.push(
			this.scene.music1,
			this.scene.music2,
			this.scene.music3
		);
	}

	/**
	 * Crée les effets sonores du jeu liés au démarrage.
	 */
	createStartSoundEffect() {
		this.scene.clickSound = this.scene.sound.add('press-start-sound');
	}

	/**
	 * Crée les effets sonores du jeu liés au menu principal.
	 */
	createrMainSoundEffect() {
		this.scene.clickSound = this.scene.sound.add('click1');
	}

	/**
	 * Crée les effets sonores du jeu liés au menu sélection du personnage.
	 */
	createCharacterSoundEffect() {
		this.scene.clickSound = this.scene.sound.add('click2');
	}

	/**
	 * Crée les effets sonores du jeu liés au menu sélection du niveau.
	 */
	createStageSoundEffect() {
		this.scene.clickSound = this.scene.sound.add('click3');
	}

	/**
	 * Crée les effets sonores du jeu liés aux effets sonores du jeu.
	 */
	createGameSoundEffect() {
		this.scene.pauseSound = this.scene.sound.add('pause');
		this.scene.gemmeSound = this.scene.sound.add('gemme');
		this.scene.coinSound = this.scene.sound.add('coin-loot');
		this.scene.projectilSound = this.scene.sound.add('projectile1');
		this.scene.deadSound = this.scene.sound.add('dead1');
		this.scene.hurtSound = this.scene.sound.add('hurt1');
		this.scene.playerHurtSound = this.scene.sound.add('player-hurt');
	}

	/**
	 * Crée les effets sonores du jeu liés aux effets sonores de fin de partie.
	 */
	createGameOverSoundEffect() {
		this.scene.gameOverSound = this.scene.sound.add('game-over');
	}

	/**
	 * Définit le volume de la musique.
	 * @param {number} volume - Le volume de la musique (de 0 à 100).
	 */
	setMusicVolume(volume) {
		this.musicVolume = volume / 100;
	}

	/**
	 * Définit le volume des effets sonores.
	 * @param {number} volume - Le volume des effets sonores (de 0 à 100).
	 */
	setSoundVolume(volume) {
		this.soundVolume = volume / 100;
	}

	/**
	 * Renvoie le volume de la musique.
	 * @returns {number} Le volume de la musique.
	 */
	getMusicVolume() {
		return this.musicVolume;
	}

	/**
	 * Renvoie le volume des effets sonores.
	 * @returns {number} Le volume des effets sonores.
	 */
	getSoundVolume() {
		return this.soundVolume;
	}

	/**
	 * Arrête toutes les musiques en cours.
	 */
	stopAllMusics() {
		this.scene.musics.forEach((music) => {
			music.stop();
		});
	}

	/**
	 * Joue une musique aléatoire en boucle.
	 */
	playRandomMusic() {
		const randomNb = Math.floor(Math.random() * this.scene.musics.length);

		this.scene.musics[randomNb].play({
			loop: true,
			volume: this.musicVolume, // Volume défini par l'utilisateur
		});
	}
}
