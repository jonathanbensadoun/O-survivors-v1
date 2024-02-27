import createAnims from './animsUtils';
/**
 * Crée les animations pour les ennemis.
 * @param {Phaser.Animations.AnimationManager} anims - Le gestionnaire d'animations.
 */
const createEnemyAnims = (anims) => {
	// Crée les animations pour les Orcs
	createAnims(anims, 'orc_death', 0, 5, 10, 0);
	createAnims(anims, 'orc_run', 0, 5, 10, -1);
	createAnims(anims, 'orcRogue_death', 0, 5, 10, 0);
	createAnims(anims, 'orcRogue_run', 0, 5, 10, 0);
	createAnims(anims, 'orcShaman_death', 0, 6, 10, 0);
	createAnims(anims, 'orcShaman_run', 0, 5, 10, -1);
	createAnims(anims, 'orcWarrior_death', 0, 5, 10, 0);
	createAnims(anims, 'orcWarrior_run', 0, 5, 10, -1);

	// Crée les animations pour les Squelettes
	createAnims(anims, 'skeleton_death', 0, 7, 16, 0);
	createAnims(anims, 'skeleton_run', 0, 5, 10, -1);
	createAnims(anims, 'skeletonMage_death', 0, 5, 10, 0);
	createAnims(anims, 'skeletonMage_run', 0, 5, 10, -1);
	createAnims(anims, 'skeletonRogue_death', 0, 5, 10, 0);
	createAnims(anims, 'skeletonRogue_death', 0, 5, 10, -1);
	createAnims(anims, 'skeletonWarrior_death', 0, 5, 10, 0);
	createAnims(anims, 'skeletonWarrior_run', 0, 5, 10, -1);

	// Crée les animations pour le boss
	createAnims(anims, 'minotaur_run', 0, 7, 16, -1);
};

export default createEnemyAnims;
