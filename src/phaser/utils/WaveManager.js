import Phaser from 'phaser';

/**
 * Gère la génération des vagues d'ennemis dans le jeu.
 */
export default class WaveManager {
	/**
	 * Initialise le gestionnaire de vagues.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 */
	static init(scene) {
		// Obtient les vagues d'ennemis à partir de la carte de la scène
		const enemyWaves = scene.map.getEnemiesWaves(scene);
		this.enemyWavesDuration = 30000; // Durée de chaque vague

		// Crée un événement de temps pour chaque vague d'ennemis
		enemyWaves.forEach((wave, index) => {
			scene.time.addEvent({
				delay: index * this.enemyWavesDuration,
				callback: () => {
					WaveManager.spawnEnemies(scene, wave);
				},
				loop: false,
			});
		});
	}

	/**
	 * Fait apparaître les ennemis d'une vague donnée.
	 * @param {Phaser.Scene} scene - La scène du jeu.
	 * @param {object} wave - Les données de la vague d'ennemis.
	 */
	static spawnEnemies(scene, wave) {
		// Vérifie si le personnage du joueur est en vie
		if (scene.character.health > 0) {
			// Fonction pour faire apparaître les ennemis de la vague
			const spawnWave = () => {
				for (let i = 0; i < wave.enemies.length; i += 1) {
					// Calcule une position aléatoire autour du joueur pour faire apparaître l'ennemi
					const angle = Phaser.Math.RND.angle(); // Random angle
					const distanceFromCharacter = Phaser.Math.RND.between(400, 450); // Distance aléatoire
					const spawnX =
						scene.character.x + distanceFromCharacter * Math.cos(angle);
					const spawnY =
						scene.character.y + distanceFromCharacter * Math.sin(angle);

					const enemyType = wave.enemies[i].type; // Type de l'ennemi
					const enemyName = wave.enemiesName[i].name; // Nom de l'ennemi

					// Vérifie si le nombre d'ennemis dans la scène est inférieur à un seuil
					if (scene.enemies.getChildren().length > 300) {
						return; // Arrête la fonction si le seuil est atteint
					}

					// Fait apparaître l'ennemi dans la scène
					const enemy = enemyType.create(
						spawnX,
						spawnY,
						`${enemyName}`,
						scene.character
					);

					enemy.isDead = false; // Marque l'ennemi comme vivant
					scene.enemies.add(enemy); // Ajoute l'ennemi au groupe d'ennemis de la scène

					const timeElapsed = scene.gameTimeClock.getElapsed() / 1000;

					const roundedTimeElasped = Math.floor(timeElapsed);

					if (roundedTimeElasped === 120) {
						const boss = scene.minotaur
							.create(spawnX, spawnY, 'minotaur', scene.character)
							.setDepth(3);

						boss.scaleX = 3;
						scene.enemies.add(boss);
					}
				}
			};

			// Crée un événement de temps pour faire apparaître les ennemis avec un intervalle
			const waveTimer = scene.time.addEvent({
				delay: wave.spawnInterval, // Intervalle entre chaque ennemi de la vague
				callback: spawnWave, // Fonction de rappel pour faire apparaître les ennemis
				loop: true, // Indique que l'événement de temps se répète indéfiniment
			});

			// Arrête de faire apparaître des ennemis après la durée de la vague
			scene.time.delayedCall(this.enemyWavesDuration, () => {
				waveTimer.remove(); // Arrête l'événement de temps
			});
		}
	}
}
