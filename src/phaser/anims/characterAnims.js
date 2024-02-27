import createAnims from './animsUtils';

/**
 * Crée les animations pour un personnage spécifique.
 * @param {Phaser.Animations.AnimationManager} anims - Le gestionnaire d'animations.
 * @param {string} character - Le nom du personnage.
 */
const createCharacterAnims = (anims, character) => {
	// Crée l'animation de mort pour le personnage
	createAnims(anims, `${character}_death`, 0, 5, 10, 0);
	// Crée l'animation d'inactivité pour le personnage
	createAnims(anims, `${character}_idle`, 0, 3, 8, -1);
	// Crée l'animation de course pour le personnage
	createAnims(anims, `${character}_run`, 0, 5, 10, -1);
};

export default createCharacterAnims;
