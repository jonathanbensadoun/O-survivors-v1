/**
 * Classe pour gérer les entrées du joueur.
 */
export default class InputManager {
	/**
	 * Crée une instance de InputManager.
	 * @param {Phaser.Scene} scene - La scène Phaser à laquelle le gestionnaire d'entrée est associé.
	 */
	constructor(scene) {
		this.scene = scene;

		// Créer des touches pour les contrôles WASD, ZQSD et les flèches directionnelles
		this.keysWASD = scene.input.keyboard.addKeys('W,A,S,D');
		this.keysZQSD = scene.input.keyboard.addKeys('Z,Q,S,D');
		this.keysArrows = scene.input.keyboard.createCursorKeys();
	}

	/**
	 * Initialise le gestionnaire d'entrée.
	 */
	init() {
		this.setupInput();
	}

	/**
	 * Met en place les écouteurs d'événements pour les entrées du joueur.
	 * @private
	 */
	setupInput() {
		// Écouter l'événement de pression de la touche ESC pour mettre en pause le jeu
		this.scene.input.keyboard.on('keydown-ESC', () => {
			this.pauseGame();
		});
	}

	/**
	 * Met en pause le jeu.
	 * @private
	 */
	pauseGame() {
		// Lancer la scène de pause et mettre en pause la scène actuelle
		this.scene.sound.play('pause', {
			volume: this.scene.audioManager.getSoundVolume(),
		});
		this.scene.scene.launch('Pause', { this: this.scene });
		this.scene.scene.pause();
	}

	/**
	 * Gère les entrées du joueur pour déplacer le personnage.
	 * @param {Phaser.Physics.Arcade.Sprite} player - Le joueur contrôlé par l'utilisateur.
	 */
	handleInput(player) {
		let { speed } = player;
		let velocityX = 0;
		let velocityY = 0;

		if (player.isDead) {
			speed = 0;
			return;
		}

		if (player.health > 0) {
			if (
				this.keysWASD.A.isDown ||
				this.keysZQSD.Q.isDown ||
				this.keysArrows.left.isDown
			) {
				velocityX = -speed;
				player.scaleX = -1;
				// Ajuster le décalage du corps pour l'animation
				player.body.offset.x = 35;
			} else if (
				this.keysWASD.D.isDown ||
				this.keysZQSD.D.isDown ||
				this.keysArrows.right.isDown
			) {
				velocityX = speed;
				player.scaleX = 1;
				// Ajuster le décalage du corps pour l'animation
				player.body.offset.x = 25;
			}

			if (
				this.keysWASD.W.isDown ||
				this.keysZQSD.Z.isDown ||
				this.keysArrows.up.isDown
			) {
				velocityY = -speed;
				// Ajuster le décalage du corps pour l'animation
				player.body.offset.x = 35;
			} else if (
				this.keysWASD.S.isDown ||
				this.keysZQSD.S.isDown ||
				this.keysArrows.down.isDown
			) {
				velocityY = speed;
				// Ajuster le décalage du corps pour l'animation
				player.body.offset.x = 30;
			}

			// Si le joueur se déplace en diagonale
			if (velocityX !== 0 && velocityY !== 0) {
				// Calcul du ratio de normalisation
				// Math.sqrt(2) représente la longueur de la diagonale dans un carré unitaire
				// En divisant par 2, on obtient le ratio de la diagonale par rapport à un côté du carré
				const ratio = Math.sqrt(2) / 2;
				// On multiplie les vitesses horizontale et verticale par le ratio de normalisation
				// Cela permet de réduire les vitesses le long des deux axes afin que la vitesse totale reste constante
				// Cela empêche le personnage de se déplacer plus rapidement en diagonale par rapport à un mouvement le long d'un seul axe
				velocityX *= ratio;
				velocityY *= ratio;
			}

			player.setVelocity(velocityX, velocityY);

			if (velocityX !== 0 || velocityY !== 0) {
				player.anims.play(`${player.name}_run`, true);
			} else if (player.health > 0) {
				player.anims.play(`${player.name}_idle`, true);
				// Réinitialiser le décalage du corps pour l'animation d'arrêt
				player.body.setOffset(17, 55);
			}
		}
	}
}
