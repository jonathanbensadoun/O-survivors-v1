import createAnims from './animsUtils';

/**
 * Crée l'animation d'effet de sang, si elle n'existe pas déjà.
 * @param {Phaser.Animations.AnimationManager} anims - Le gestionnaire d'animations.
 */
const createBloodAnims = (anims) => {
	// Crée l'animation d'éclaboussures de sang
	createAnims(anims, 'bloodEffect1', 0, 10, 15, 0);
};

export default createBloodAnims;
