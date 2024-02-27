import Player from './Player';

/**
 * Classe représentant un sorcier, héritant des caractéristiques de le classe Player.
 */
export default class Wizard extends Player {
	/**
	 * Crée un nouvel objet sorcier.
	 * @param {Phaser.Scene} scene - La scène à laquelle le sorcier appartient.
	 * @param {number} x - La position horizontale initiale du sorcier.
	 * @param {number} y - La position verticale initiale du sorcier.
	 * @param {string} texture - La texture à utiliser pour le sorcier.
	 */
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.scene = scene;

		// Propriétés spécifiques au sorcier
		this.name = 'wizard';
		this.speed = 100;
		this.health = 100; // Vie
		this.maxHealth = 100; // Vie Max
		this.attack = 50; // Dégâts de Base
		this.attackRange = 200; // Portée d'attaque
		this.lastAttackTime = 0;
		this.attackCooldown = 1200;
		this.attackSpeed = 150;
		this.numberOfProjectiles = 1; // Nombre de projectiles que le joueur peut lancer simultanément
		this.xp = 0; // XP actuelle
		this.xpToNextLevel = 100; // XP nécessaire pour le prochain niveau
		this.level = 1;
	}

	/**
	 * Met à jour l'état du sorcier à chaque frame.
	 * @param {Phaser.Scene} scene - La scène en cours.
	 */
	update(scene) {
		super.update(scene);
	}
}
