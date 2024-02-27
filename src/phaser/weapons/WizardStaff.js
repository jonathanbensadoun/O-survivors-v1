import Phaser from 'phaser';

/**
 * Classe représentant le bâton du sorcier, utilisé pour gérer les attaques automatiques et la création de projectiles.
 */

export default class WizardStaff {
	/**
	 * Crée une instance du bâton du sorcier.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Gère l'attaque automatique du personnage avec le bâton du sorcier.
	 * @param {number} time - Le temps actuel du jeu.
	 */
	handleAutoAttack(time) {
		// Vérifie si le temps écoulé dépasse le temps de la dernière attaque plus le temps de recharge
		if (
			time >
			this.scene.character.lastAttackTime + this.scene.character.attackCooldown
		) {
			// Recherche des ennemis les plus proches dans la portée d'attaque
			const targets = this.findClosestEnemies(
				this.scene.character.x,
				this.scene.character.y,
				this.scene.character.numberOfProjectiles,
				this.scene.character.attackRange
			);

			// Attaque chaque ennemi trouvé
			targets.forEach((target) => {
				this.attackClosestEnemy(target); // Cette fonction crée maintenant un projectile par ennemi
			});

			// Met à jour le temps de la dernière attaque du personnage
			if (targets.length > 0) {
				this.scene.character.lastAttackTime = time;
			}
		}
	}

	/**
	 * Recherche et renvoie les ennemis les plus proches du personnage dans une certaine portée.
	 * @param {number} CharacterX - La position en X du personnage.
	 * @param {number} CharacterY - La position en Y du personnage.
	 * @param {number} numberOfTargets - Le nombre d'ennemis à cibler.
	 * @param {number} range - La portée de recherche des ennemis.
	 * @returns {Phaser.GameObjects.Sprite[]} - Les ennemis les plus proches.
	 */
	findClosestEnemies(CharacterX, CharacterY, numberOfTargets, range) {
		const enemiesInRange = [];

		// Parcourt tous les ennemis et les ajoute s'ils sont dans la portée spécifiée
		this.scene.enemies.children.each((enemy) => {
			const distance = Phaser.Math.Distance.Between(
				CharacterX,
				CharacterY,
				enemy.x,
				enemy.y
			);

			if (distance < range) {
				enemiesInRange.push({ enemy, distance });
			}
		});

		// Triez les ennemis par distance et prenez les 'numberOfTargets' premiers
		return enemiesInRange
			.sort((a, b) => a.distance - b.distance)
			.slice(0, numberOfTargets)
			.map((a) => a.enemy);
	}

	/**
	 * Attaque l'ennemi le plus proche avec un projectile.
	 * @param {Phaser.GameObjects.Sprite} closestEnemy - L'ennemi le plus proche à attaquer.
	 */
	attackClosestEnemy(closestEnemy) {
		// Vérifiez si l'ennemi a encore de la santé avant de lancer une attaque
		if (closestEnemy.health > 0) {
			// Calcule la position cible du projectile en fonction de l'ennemi
			const targetX = closestEnemy.body
				? closestEnemy.body.center.x
				: closestEnemy.x;
			const targetY = closestEnemy.body
				? closestEnemy.body.center.y
				: closestEnemy.y;

			// Crée un projectile et le lance vers l'ennemi
			this.createProjectile(
				this.scene.character.x,
				this.scene.character.y,
				targetX,
				targetY,
				this.scene.character.attackSpeed
			);

			// Joue le son de l'attaque
			this.scene.sound.play('projectile1', {
				volume: this.scene.audioManager.getSoundVolume() * 3,
			});

			// Met à jour le temps de la dernière attaque du personnage
			this.scene.character.lastAttackTime = this.scene.time.now;
		}
	}

	/**
	 * Crée un projectile lancé par le bâton du sorcier.
	 * @param {number} x1 - La position en X de départ du projectile.
	 * @param {number} y1 - La position en Y de départ du projectile.
	 * @param {number} x2 - La position en X de la cible du projectile.
	 * @param {number} y2 - La position en Y de la cible du projectile.
	 */
	createProjectile(x1, y1, x2, y2) {
		// Crée un sprite pour le projectile
		const projectile = this.scene.physics.add.sprite(
			x1,
			y1,
			'wizardStaffProjectile'
		);

		// Calcule l'angle de direction du projectile
		const angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);

		// Ajuste l'angle du sprite
		projectile.rotation = angle;

		// Donne au projectile une vitesse basée sur la direction et la vitesse d'attaque du personnage
		projectile.setVelocity(
			Math.cos(angle) * this.scene.character.attackSpeed,
			Math.sin(angle) * this.scene.character.attackSpeed
		);

		// Définit la taille du projectile
		projectile.setSize(10, 10);

		// Lance l'animation du projectile
		projectile.play('wizardStaffProjectile');

		// Ajoute une collision entre le projectile et les ennemis
		this.scene.projectileCollision = this.scene.physics.add.overlap(
			projectile,
			this.scene.enemies,
			this.handleProjectileCollision,
			null,
			this.scene
		);

		// Détruit le projectile après un certain délai
		this.scene.time.delayedCall(10000, () => projectile.destroy());
	}

	/**
	 * Gère la collision entre un projectile et un ennemi.
	 * @param {Phaser.GameObjects.Sprite} projectile - Le projectile qui a causé la collision.
	 * @param {Phaser.GameObjects.Sprite} enemy - L'ennemi touché par le projectile.
	 */
	handleProjectileCollision(projectile, enemy) {
		// Applique un effet visuel à l'ennemi touché en le teintant en blanc
		enemy.setTintFill(0xffffff);

		// Réinitialise la teinte de l'ennemi après un court délai (100 millisecondes)
		setTimeout(() => {
			enemy.clearTint();
		}, 100);

		// Inflige des dégâts à l'ennemi en fonction de la puissance d'attaque du personnage du joueur
		enemy.takeDamage(this.scene.scene.character.attack, this.scene);

		// Détruit le projectile après la collision
		projectile.destroy();
	}
}
