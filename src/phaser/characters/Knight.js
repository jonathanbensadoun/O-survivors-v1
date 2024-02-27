import Player from './Player';

export default class Knight extends Player {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.scene = scene;

		this.name = 'knight';
		this.speed = 100;

		this.health = 100; // Vie
		this.maxHealth = 100; // Vie Max

		this.attack = 50; // Dégâts de Base

		this.bloodAnimationPlaying = false;

		this.lastAttackTime = 0;
		this.attackCooldown = 1200;
		this.attackSpeed = 150;

		this.attackRange = 200; // Portée d'attaque

		this.numberOfProjectiles = 1; // Nombre de projectiles que le joueur peut lancer simultanément

		this.xp = 0; // XP actuelle
		this.xpToNextLevel = 100; // XP nécessaire pour le prochain niveau
		this.level = 1;
	}

	update(scene) {
		super.update(scene);
	}
}
