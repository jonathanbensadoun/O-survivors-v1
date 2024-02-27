import createAnims from './animsUtils';

/**
 * Crée l'animation du projectile de bâton de mage, si elle n'existe pas déjà.
 * @param {Phaser.Animations.AnimationManager} anims - Le gestionnaire d'animations.
 */
const createWeaponAnims = (anims) => {
	// Crée l'animation du projectile du bâton de mage
	createAnims(anims, 'wizardStaffProjectile', 0, 3, 15, -1);
};

export default createWeaponAnims;
