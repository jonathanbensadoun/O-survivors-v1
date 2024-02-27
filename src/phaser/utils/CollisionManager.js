/**
 * Gestionnaire des collisions dans le jeu.
 */
export default class CollisionManager {
	/**
	 * Crée une instance du gestionnaire de collisions.
	 * @param {Phaser.Scene} scene - La scène à laquelle le gestionnaire de collisions est associé.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Initialise les collisions et les chevauchements.
	 */
	init() {
		this.setupCollisions();
		this.setupOverlaps();
	}

	/**
	 * Met en place les collisions entre les différents éléments du jeu.
	 */
	setupCollisions() {
		// Collisions entre le personnage et les couches de murs et d'éléments destructibles de la cartes
		this.scene.physics.add.collider(
			this.scene.character,
			this.scene.map.wallsLayer
		);
		this.scene.physics.add.collider(
			this.scene.character,
			this.scene.map.destructiblesLayer
		);

		// Collisions entre les ennemis emsembles
		this.scene.physics.world.addCollider(
			this.scene.enemies,
			this.scene.enemies
		);

		// Collisions entre les ennemis et le personnage
		this.scene.physics.add.collider(
			this.scene.enemies,
			this.scene.character,
			/**
			 * Fonction de gestion des collisions entre les ennemis et le personnage.
			 * @param {Phaser.GameObjects.GameObject} enemy - L'ennemi impliqué dans la collision.
			 * @param {Phaser.GameObjects.GameObject} player - Le personnage du joueur.
			 */
			this.handleEnemyPlayerCollision,
			null,
			this
		);
	}

	/**
	 * Met en place les chevauchements entre le personnage et les différents objets du jeu.
	 */
	setupOverlaps() {
		// Chevauchement pour les potions de PV
		this.scene.physics.add.overlap(
			this.scene.character,
			this.scene.lootsPV,
			/**
			 * Fonction de gestion du chevauchement avec les potions de PV.
			 * @param {Phaser.GameObjects.GameObject} character - Le personnage du joueur.
			 * @param {Phaser.GameObjects.GameObject} lootPV - La potion de PV.
			 */
			(character, lootPV) => {
				lootPV.healEffect(character);
				lootPV.destroy();
			}
		);

		// Chevauchement pour les gemmes d'XP
		this.scene.physics.add.overlap(
			this.scene.character,
			this.scene.lootsXP,
			/**
			 * Fonction de gestion du chevauchement avec les gemmes d'XP.
			 * @param {Phaser.GameObjects.GameObject} _character - Le personnage du joueur.
			 * @param {Phaser.GameObjects.GameObject} lootXP - La gemme d'XP.
			 */
			(_character, lootXP) => {
				this.scene.sound.play('gemme', {
					volume: this.scene.audioManager.getSoundVolume() * 2,
				});

				lootXP.xpEffect(this.scene.character);
				lootXP.destroy(); // Assurez-vous de détruire le loot une fois collecté
			}
		);

		// Chevauchement pour les pieces
		this.scene.physics.add.overlap(
			this.scene.character,
			this.scene.lootsCoin,
			/**
			 * Fonction de gestion du chevauchement avec les pièces de monnaie.
			 * @param {Phaser.GameObjects.GameObject} _character - Le personnage du joueur.
			 * @param {Phaser.GameObjects.GameObject} lootCoin - La pièce de monnaie.
			 */
			(_character, lootCoin) => {
				this.scene.sound.play('coin-loot', {
					volume: this.scene.audioManager.getSoundVolume(),
				});

				lootCoin.increaseCoinCount(this.scene.character);
				lootCoin.destroy();
			}
		);
	}

	/**
	 * Gère la collision entre un ennemi et le joueur.
	 */
	handleEnemyPlayerCollision() {
		this.scene.isCollision = true;

		this.scene.character.setTintFill(0xff0000);

		// Effacer la teinte après un certain délai
		this.scene.time.addEvent({
			delay: 550,
			callback: () => {
				this.scene.character.clearTint();
			},
		});

		// Infliger des dégâts au joueur s'il n'est pas en période d'invincibilité
		if (
			!this.scene.character.damageTimer ||
			this.scene.time.now > this.scene.character.damageTimer
		) {
			this.scene.character.damage(5);
			this.scene.character.damageTimer = this.scene.time.now + 250;
		}
	}
}
