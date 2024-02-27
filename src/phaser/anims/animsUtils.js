/**
 * Crée une animation avec les paramètres spécifiés, si elle n'existe pas déjà.
 * @param {Phaser.Animations.AnimationManager} anims - Le gestionnaire d'animations.
 * @param {string} key - La clé de l'animation.
 * @param {number} start - Le numéro du premier cadre de l'animation.
 * @param {number} end - Le numéro du dernier cadre de l'animation.
 * @param {number} [frameRate=10] - Le taux de trame de l'animation (images par seconde).
 * @param {number} [repeat=-1] - Le nombre de répétitions de l'animation (-1 pour une répétition infinie).
 */
const createAnims = (anims, key, start, end, frameRate = 10, repeat = -1) => {
	if (!anims.exists(`${key}`)) {
		anims.create({
			key: `${key}`,
			frames: anims.generateFrameNumbers(`${key}`, {
				start: `${start}`,
				end: `${end}`,
			}),
			frameRate: `${frameRate}`,
			repeat: `${repeat}`,
		});
	}
};

export default createAnims;
