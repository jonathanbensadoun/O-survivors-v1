import LootPV from '../items/LootPV';
import LootXP from '../items/LootXP';
import LootCoin from '../items/LootCoin';

import Skeleton from '../enemies/Skeleton';
import SkeletonMage from '../enemies/SkeletonMage';
import SkeletonRogue from '../enemies/SkeletonRogue';
import Orc from '../enemies/Orc';
import OrcRogue from '../enemies/OrcRogue';
import OrcWarrior from '../enemies/OrcWarrior';
import Minotaur from '../enemies/Minotaur';

/**
 * Gère la création et la gestion des groupes d'objets et d'ennemis dans le jeu.
 */
export default class GroupManager {
	/**
	 * Crée une instance de GroupManager.
	 * @param {Phaser.Scene} scene - La scène Phaser à laquelle GroupManager est lié.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Initialise les groupes d'objets et d'ennemis.
	 */
	init() {
		this.createLootsPV();
		this.createLootsXP();
		this.createLootCoin();

		this.createEnemiesGroup();
	}

	// ITEMS

	/**
	 * Crée le groupe pour les potions de vie (PV).
	 */
	createLootsPV() {
		this.scene.lootsPV = this.scene.physics.add.group({
			classType: LootPV,
			runChildUpdate: true,
		});
	}

	/**
	 * Crée le groupe pour les gemmes d'expérience (XP).
	 */
	createLootsXP() {
		this.scene.lootsXP = this.scene.physics.add.group({
			classType: LootXP,
			runChildUpdate: true,
		});
	}

	/**
	 * Crée le groupe pour les pièces (monnaie du jeu).
	 */
	createLootCoin() {
		this.scene.lootsCoin = this.scene.physics.add.group({
			classType: LootCoin,
			runChildUpdate: true,
		});
	}

	// ENNEMIS

	/**
	 * Crée le groupe d'ennemis.
	 */
	createEnemiesGroup() {
		this.scene.enemies = this.scene.physics.add.group();

		this.scene.skeletons = this.scene.physics.add.group({
			classType: Skeleton,
		});
		this.scene.skeletonsMage = this.scene.physics.add.group({
			classType: SkeletonMage,
		});
		this.scene.skeletonsRogue = this.scene.physics.add.group({
			classType: SkeletonRogue,
		});
		this.scene.orcs = this.scene.physics.add.group({
			classType: Orc,
		});
		this.scene.orcsRogue = this.scene.physics.add.group({
			classType: OrcRogue,
		});
		this.scene.orcsWarrior = this.scene.physics.add.group({
			classType: OrcWarrior,
		});
		this.scene.minotaur = this.scene.physics.add.group({
			classType: Minotaur,
		});
	}
}
