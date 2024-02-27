import { Scene } from 'phaser';

/**
 * La scène de préchargement du jeu, chargée pour charger les ressources nécessaires au jeu.
 * Pendant le chargement, une barre de progression est affichée pour indiquer le progrès du chargement.
 */
export default class Preloader extends Scene {
	constructor() {
		super('Preloader');
	}

	/**
	 * Méthode appelée automatiquement lorsque la scène est initialisée.
	 * Affiche les éléments visuels de la barre de progression.
	 */
	init() {
		const { width, height } = this.scale;

		// Ajoute l'image de fond (chargée dans la scène de démarrage)
		this.add.image(width / 2, height / 2);

		// Ajoute la barre de progression (un rectangle)
		this.add
			.rectangle(width / 2, height / 2, 234, 16)
			.setStrokeStyle(1, 0xffffff);

		// Ajoute la barre de progression elle-même (un rectangle qui se remplit)
		const bar = this.add.rectangle(
			width / 2 - 115,
			height / 2,
			2,
			14,
			0xffffff
		);

		// Écoute l'événement 'progress' émis par le chargeur de ressources pour mettre à jour la barre de progression
		this.load.on('progress', (progress) => {
			// Met à jour la largeur de la barre de progression en fonction du pourcentage de chargement
			bar.width = 2 + 230 * progress;
		});
	}

	/**
	 * Méthode de préchargement appelée automatiquement par Phaser.
	 * Charge les ressources nécessaires au jeu, comme les images, les sons, les données de carte, etc.
	 */
	preload() {
		// Définit le chemin de base pour le chargement des ressources
		this.load.setPath('assets');

		// Chargement des sons
		this.load.audio('pause', ['audio/game/pause.wav']);
		this.load.audio('coin-loot', ['audio/game/coin-loot.m4a']);
		this.load.audio('click1', ['audio/menu/pick-up-1.m4a']);
		this.load.audio('click2', ['audio/menu/pick-up-2.m4a']);
		this.load.audio('click3', ['audio/menu/pick-up-3.m4a']);
		this.load.audio('click4', ['audio/menu/pick-up-4.m4a']);
		this.load.audio('projectile1', ['audio/game/attack_knight.wav']);
		this.load.audio('hurt1', ['audio/game/Hit3.wav']);
		this.load.audio('dead1', ['audio/game/dead.m4a']);
		this.load.audio('player-hurt', ['audio/game/hurt_2.wav']);
		this.load.audio('game-over', ['audio/game/game_over.wav']);
		this.load.audio('gemme', ['audio/game/Coin1.wav']);
		this.load.audio('music1', [
			'audio/music/bit-shift-kevin-macleod-main-version-24901-03-12.mp3',
		]);
		this.load.audio('music2', [
			'audio/music/cyborg-ninja-kevin-macleod-main-version-03-00-7993.mp3',
		]);
		this.load.audio('music3', [
			'audio/music/pookatori-and-friends-kevin-macleod-main-version-24903-04-07.mp3',
		]);

		// Chargement des polices
		this.load.bitmapFont('VT323', 'fonts/VT323/VT323-Regular.bmp');

		// Chargement des images
		this.load.image('main-menu-bg', 'ui/mainMenu/main-menu-bg.jpg');
		this.load.image('xpbar', 'ui/hud/GuI-xp-colored.png');
		this.load.image('kill-icon', 'ui/hud/kill-icon.png');
		this.load.image('gem-icon', 'items/gem_01c.png');
		this.load.image('Props', 'map/prison/Props.png');
		this.load.image('Tiles', 'map/prison/Tiles.png');
		this.load.image('CatacombsTiles', 'map/catacombs/CatacombsTiles.png');
		this.load.image('decorative', 'map/catacombs/decorative.png');
		this.load.image(
			'Basic_Grass_Biom_things',
			'map/meadow/Basic_Grass_Biom_things.png'
		);
		this.load.image('Fences', 'map/meadow/Fences.png');
		this.load.image('Grass', 'map/meadow/Grass.png');
		this.load.image('Hills', 'map/meadow/Hills.png');
		this.load.image(
			'DesertTilemapBlankBackground',
			'map/desert/DesertTilemapBlankBackground.png'
		);

		this.load.tilemapTiledJSON('desert', 'map/desert/desert.json');

		// Icones (Level up, bonus,...)
		this.load.image('bonusAtkSpd', 'icons/icon-atk-speed.png');
		this.load.image('bonusProj', 'icons/icon-nb-of-projectiles.png');
		this.load.image('bonusHeal', 'icons/max-health.png');
		this.load.image('bonusSpeed', 'icons/move-speed.png');
		this.load.image('bonusAtk', 'icons/icon-degat.png');

		// Accessoires (Potions de vie, xp, ...)
		this.load.image('lootPV', 'effects/health_potion.png');
		this.load.image('lootXP', 'effects/gem.png');
		this.load.image('xpbar', 'ui/hud/GuI-xp-colored.png');

		// Chargement des données de carte
		this.load.tilemapTiledJSON('desert', 'map/desert/desert.json');
		this.load.tilemapTiledJSON('prison', 'map/prison/prison.json');
		this.load.tilemapTiledJSON('catacombs', 'map/catacombs/catacombs.json');
		this.load.tilemapTiledJSON('meadow', 'map/meadow/meadow.json');

		// Chargement des sprites
		this.load.spritesheet(
			'bloodEffect1',
			'effects/blood/VFX-Blood-Batch-1.png',
			{
				frameWidth: 110,
				frameHeight: 93,
			}
		);
		// Wizard assets
		this.load.spritesheet('wizard_death', 'characters/wizard/Death-Sheet.png', {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet('wizard_idle', 'characters/wizard/Idle-Sheet.png', {
			frameWidth: 32,
			frameHeight: 64,
		});
		this.load.spritesheet('wizard_run', 'characters/wizard/Run-Sheet.png', {
			frameWidth: 64,
			frameHeight: 64,
		});
		// Chargement du sprite de projectile
		this.load.spritesheet(
			'wizardStaffProjectile',
			'effects/Sprite-wizardStaffProjectile.png',
			{
				frameWidth: 48,
				frameHeight: 16,
			}
		);
		// Boss
		this.load.spritesheet('minotaur_run', 'enemies/minotaur/Run.png', {
			frameWidth: 110,
			frameHeight: 90,
		});
		// Orc-crew assets
		// Orc assets
		this.load.spritesheet('orc_death', 'enemies/orc-crew/orc/Death-Sheet.png', {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet('orc_run', 'enemies/orc-crew/orc/Run.png', {
			frameWidth: 64,
			frameHeight: 64,
		});
		// Orc Rogue assets
		this.load.spritesheet(
			'orcRogue_death',
			'enemies/orc-crew/orc-rogue/Death-Sheet.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'orcRogue_run',
			'enemies/orc-crew/orc-rogue/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Orc Shaman assets
		this.load.spritesheet(
			'orcShaman_death',
			'enemies/orc-crew/orc-shaman/Death-Sheet.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'orcShaman_run',
			'enemies/orc-crew/orc-shaman/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Orc Warrior assets
		this.load.spritesheet(
			'orcWarrior_death',
			'enemies/orc-crew/orc-warrior/Death-Sheet.png',
			{
				frameWidth: 96,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'orcWarrior_run',
			'enemies/orc-crew/orc-warrior/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Skeleton-crew assets
		// Skeleton
		this.load.spritesheet(
			'skeleton_death',
			'enemies/skeleton-crew/skeleton/Death-Sheet.png',
			{
				frameWidth: 96,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'skeleton_run',
			'enemies/skeleton-crew/skeleton/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Skeleton-crew assets
		// Skeleton Mage
		this.load.spritesheet(
			'skeletonMage_death',
			'enemies/skeleton-crew/skeleton-mage/Death-Sheet.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'skeletonMage_run',
			'enemies/skeleton-crew/skeleton-mage/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Skeleton-crew assets
		// Skeleton Rogue
		this.load.spritesheet(
			'skeletonRogue_death',
			'enemies/skeleton-crew/skeleton-rogue/Death-Sheet.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			'skeletonRogue_run',
			'enemies/skeleton-crew/skeleton-rogue/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		// Skeleton-crew assets
		// Skeleton Warrior
		this.load.spritesheet(
			'skeletonWarrior_death',
			'enemies/skeleton-crew/skeleton-warrior/Death-Sheet.png',
			{
				frameWidth: 64,
				frameHeight: 48,
			}
		);
		this.load.spritesheet(
			'skeletonWarrior_run',
			'enemies/skeleton-crew/skeleton-warrior/Run.png',
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
	}

	/**
	 * Méthode appelée automatiquement lorsque le chargement est terminé.
	 * Permet de créer des objets globaux ou de passer à la prochaine scène du jeu.
	 */
	create() {
		// Démarre la prochaine scène du jeu, la scène de démarrage
		this.scene.start('StartScreen');
	}
}
