import Phaser from 'phaser';

/**
 * Classe de base représentant un joueur dans le jeu.
 * Cette classe hérite de Phaser.Physics.Arcade.Sprite et fournit des fonctionnalités de base pour les personnages du jeu.
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Crée une nouvelle instance de joueur.
	 * @param {Phaser.Scene} scene - La scène à laquelle le joueur appartient.
	 * @param {number} x - La position horizontale initiale du joueur.
	 * @param {number} y - La position verticale initiale du joueur.
	 * @param {string} texture - La texture à utiliser pour le joueur.
	 */
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		// Ajoute le joueur à la scène et à la physique de la scène
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Définit la taille du corps du joueur (20% de sa taille)
		this.body.setSize(this.width * 0.2, this.height * 0.2);

		// Initialise l'état de mort du joueur à faux
		this.isDead = false;

		// Empêche le joueur d'être poussé par les collisions
		this.setPushable(false);

		// Initialisation des niveaux de bonus
		this.bonusLevels = {
			'Level Projectile': 1,
			"Level Vitesse d'attaque": 1,
			'Level Vitesse de déplacement': 1,
			'Level Dégâts': 1,
		};

		// Créer le logo et le texte pour "Bonus MAX"
		this.maxBonusLogo = scene.add
			.image(
				this.scene.scale.width / 2 - 290,
				this.scene.scale.height / 2 - 210,
				'bonusHeal'
			)
			.setVisible(false)
			.setScrollFactor(0)
			.setDepth(100)
			.setScale(1.2);
		this.maxBonusText = scene.add
			.text(
				this.scene.scale.width / 2 - 290,
				this.scene.scale.height / 2 - 190,
				'Bonus MAX +50PV',
				{
					fontFamily: 'VT323',
					fontSize: '20px',
					color: '#3A4466',
				}
			)
			.setOrigin(0.5)
			.setVisible(false)
			.setScrollFactor(0)
			.setDepth(100);
	}

	/**
	 * Méthode appelée à chaque trame pour mettre à jour l'état du joueur.
	 * Gère les entrées du joueur et la détection de la mort du joueur.
	 */
	update() {
		// Vérifie si le joueur est en vie
		if (this.health > 0) {
			// Gère les entrées du joueur
			this.scene.inputManager.handleInput(this);
		}

		// Vérifie si le joueur est mort et n'a pas encore été traité
		if (this.health <= 0 && this.isDead === false) {
			// Marque le joueur comme mort
			this.isDead = true;

			// Traite la mort du joueur
			this.scene.handlePlayerDeath();
		}
	}

	damage(amount) {
		// Reduce player's health by the specified amount
		this.health -= amount;

		if (this.health > 0) {
			this.scene.sound.play('player-hurt', {
				volume: this.scene.audioManager.getSoundVolume() * 3,
			});
		}

		// Check if the player is dead
		if (this.health <= 0 && !this.deadAnimationPlayed) {
			this.deadAnimationPlayed = true; // Set flag to prevent multiple plays of the animation
			this.anims.play(`${this.name}_death`, true);

			this.once('animationcomplete', () => {
				// Destroy the character object after the dead animation has played
				this.destroy();
			});
		}
	}

	// Méthode pour soigner le joueur
	heal(amount) {
		this.health += amount;
		this.health = Phaser.Math.Clamp(this.health, 0, this.maxHealth);
	}

	gainXP(amount) {
		this.xp += amount;
		if (this.xp >= this.xpToNextLevel) {
			this.xp -= this.xpToNextLevel;

			this.xpToNextLevel += 50;
			this.level += 1;

			console.log('tableau des levels', this.bonusLevels);
			if (Object.values(this.bonusLevels).every((level) => level < 6)) {
				this.scene.scene.launch('LevelUp', { character: this });
				this.scene.scene.pause('Game');
			} else {
				this.health = Math.min(this.health + 50, this.maxHealth);
				console.log('this.maxHealth', this.maxHealth);
				// Afficher le logo et le texte
				this.maxBonusLogo.setVisible(true);
				this.maxBonusText.setVisible(true);

				// Masquer le logo et le texte après 5000 millisecondes (5 secondes)
				this.scene.time.delayedCall(5000, () => {
					this.maxBonusLogo.setVisible(false);
					this.maxBonusText.setVisible(false);
				});
			}
		}

		// Mettre à jour la barre d'XP ici
		// this.scene.updateXPBar();
	}
}
