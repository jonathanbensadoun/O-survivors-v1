import Phaser from 'phaser';

/**
 * Classe représentant le stage desert.
 */
export default class DesertStage extends Phaser.Scene {
	constructor(scene) {
		super({ key: 'desert' });
		this.scene = scene;

		// Déclaration des couches de collision comme propriétés publiques
		this.wallsLayer = null;
		this.widthInPixels = 1280;
		this.heightInPixels = 1280;
	}

	/**
	 * Méthode appelée lors de la création du stage des catacombes.
	 */
	create() {
		// Créer la carte
		this.map = this.scene.make.tilemap({ key: 'desert' });

		// Ajouter les tilesets
		this.tileset = this.map.addTilesetImage(
			'DesertTilemapBlankBackground',
			'DesertTilemapBlankBackground'
		);
		// this.mockTileset = this.map.addTilesetImage('Mockup2', 'Mockup2');

		// Créer les couches
		this.groundLayer = this.map.createLayer('ground', this.tileset);
		this.wallsLayer = this.map.createLayer('walls', this.tileset);
		this.destructiblesLayer = this.map.createLayer(
			'destructibles',
			this.tileset
		);

		// Définir les collisions
		this.wallsLayer.setCollisionByProperty({ collides: true });
		this.destructiblesLayer.setCollisionByProperty({ collides: true });
	}

	/**
	 * Obtient les vagues d'ennemis pour le stage desert.
	 * @param {Phaser.Scene} scene - La scène à laquelle le stage desert est associé.
	 * @returns {Object[]} - Les vagues d'ennemis pour le stage desert.
	 */
	getEnemiesWaves(scene) {
		this.enemyWaves = [
			// minute 0
			{
				enemies: [{ type: scene.skeletons }],
				enemiesName: [{ name: 'skeleton' }],
				enemyMinimum: 15,
				spawnInterval: 1000,
			},
			// minute 1
			{
				enemies: [{ type: scene.skeletons }, { type: scene.orcs }],
				enemiesName: [{ name: 'skeleton' }, { name: 'orc' }],
				enemyMinimum: 30,
				spawnInterval: 500,
			},
			// minute 2
			{
				enemies: [{ type: scene.skeletons }, { type: scene.skeletonsMage }],
				enemiesName: [{ name: 'skeleton' }, { name: 'skeletonMage' }],
				enemyMinimum: 50,
				spawnInterval: 250,
			},
			// minute 3
			{
				enemies: [{ type: scene.orcsWarrior }],
				enemiesName: [{ name: 'orcWarrior' }],
				enemyMinimum: 40,
				spawnInterval: 250,
			},
			// minute 5
			{
				enemies: [{ type: scene.skeletonsRogue }, { type: scene.orcsRogue }],
				enemiesName: [{ name: 'skeletonRogue' }, { name: 'orcRogue' }],
				enemyMinimum: 30,
				spawnInterval: 100,
			},
		];

		return this.enemyWaves;
	}
}
