import { Scene } from 'phaser';

/**
 * La classe représentant la scène de niveau pour la montée de niveau du personnage.
 * Cette scène affiche une modale avec des options de bonus pour le personnage à chaque fois qu'il monte de niveau.
 */
export default class LevelUp extends Scene {
	/**
	 * Constructeur de la classe.
	 * Initialise la scène avec le nom 'LevelUp'.
	 */
	constructor() {
		super('LevelUp');
	}

	/**
	 * Fonction appelée lors de la création de la scène.
	 * Crée les touches de curseur et affiche la modale de montée de niveau.
	 */
	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.character = this.sys.settings.data.character || {};
		// this.character.bonusLevels = this.character.bonusLevels || {
		// 	'Level Projectile': 6,
		// 	"Level Vitesse d'attaque": 6,
		// 	'Level Vitesse de déplacement': 6,
		// 	'Level Dégâts': 6,
		// };

		// Mapping des bonus aux noms d'icônes et alias pour l'affichage
		this.bonusIcons = {
			'Level Projectile': {
				iconName: 'bonusProj',
				displayName: 'Projectile +1',
			},
			"Level Vitesse d'attaque": {
				iconName: 'bonusAtkSpd',
				displayName: "Vit. d'Attaque +",
			},
			'Level Vitesse de déplacement': {
				iconName: 'bonusSpeed',
				displayName: 'Vitesse +',
			},
			'Level Dégâts': { iconName: 'bonusAtk', displayName: 'Dégâts +' },
		};

		this.backgroundColors = [
			0xffffff, // Blanc
			0x77ff9c, // Vert
			0x77e8ff, // Bleu
			0xdd98ff, // Pourpre
			0xffd598, // Orange
		];

		this.modalElements = [];
		this.showLevelUpModal();
	}

	/**
	 * Affiche la modale de montée de niveau avec des options de bonus.
	 */
	showLevelUpModal() {
		// Nettoyer les éléments existants
		this.modalElements.forEach((element) => element.destroy());
		this.modalElements = [];

		// Titre
		const centreX = this.scale.width / 2;
		const centreY = this.scale.height / 2;
		const modalHeight = 300;
		const titleYOffset = -120;
		const titleFontSize = '90px';

		const title = this.add
			.text(centreX, centreY - modalHeight / 2 + titleYOffset, 'LEVEL UP', {
				fontFamily: 'VT323',
				fontSize: titleFontSize,
				color: '#FFFFFF',
			})
			.setShadow(5, 5, '#3A4466', 2, true, true)
			.setOrigin(0.5, 0)
			.setDepth(11);

		this.modalElements.push(title);

		// Cartes Bonus
		const cardWidth = 200;
		const cardHeight = 300;
		const cardSpacing = 20;

		const borderWidth = 10;

		const firstCardX =
			(this.cameras.main.width - (cardWidth * 3 + cardSpacing * 2)) / 2;
		const cardY = (this.cameras.main.height - cardHeight) / 2;

		const bonuses = Object.entries(this.character.bonusLevels)
			.filter(([, level]) => level < 6)
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);

		bonuses.forEach(([name, level], index) => {
			const cardX = firstCardX + (cardWidth + cardSpacing) * index;
			const borderColor =
				this.backgroundColors[
					Math.min(level - 1, this.backgroundColors.length - 1)
				];

			// Carte de bonus
			const bonusBackground = this.add
				.graphics({ x: cardX, y: cardY })
				.setDepth(2)
				.setAlpha(1);

			bonusBackground
				.fillStyle('0x3A4466', 1)
				.fillRoundedRect(0, 0, cardWidth, cardHeight, 20);

			bonusBackground
				.lineStyle(borderWidth, borderColor, 1)
				.strokeRoundedRect(0, 0, cardWidth, cardHeight, 20);

			// Icone
			const { iconName, displayName } = this.bonusIcons[name];
			const iconX = cardX + cardWidth / 2;
			const iconY = cardY + 50;

			const icon = this.add
				.image(iconX, iconY, iconName)
				.setDepth(2)
				.setScale(2);

			// Nom du bonus
			const text = this.add
				.text(cardX + cardWidth / 2, cardY + cardHeight / 2, displayName, {
					fontFamily: 'VT323',
					fill: '#FFFFFF',
					align: 'center',
					fontSize: '27px',
					stroke: 'black',
					strokeThickness: 1,
				})
				.setOrigin(0.5, 0.5)
				.setDepth(2)
				.setInteractive()
				.on('pointerdown', () => {
					this.applySelectedBonus(name);
				});

			// Niveau du bonus
			const levelText = this.add
				.text(cardX + cardWidth / 2, cardY + cardHeight - 30, `${level}/6`, {
					fontFamily: 'VT323',
					fill: '#FFFFFF',
					align: 'center',
					fontSize: '20px',
				})
				.setOrigin(0.5, 0.5)
				.setDepth(2);

			this.modalElements.push(bonusBackground);
			this.modalElements.push(icon);
			this.modalElements.push(text);
			this.modalElements.push(levelText);
		});
	}

	/**
	 * Applique le bonus sélectionné au personnage.
	 * @param {string} selectedBonus - Le bonus sélectionné par le joueur.
	 */
	applySelectedBonus(selectedBonus) {
		this.character.bonusLevel = this.character.bonusLevels[selectedBonus];
		console.log(selectedBonus, this.character.bonusLevel);
		// Augmente le niveau du bonus sélectionné
		this.character.bonusLevels[selectedBonus] = this.character.bonusLevel + 1;

		// Applique l'effet du bonus au personnage
		switch (selectedBonus) {
			case 'Level Projectile':
				// Augmente le nombre de projectiles
				this.character.numberOfProjectiles =
					(this.character.numberOfProjectiles || 1) + 1;
				break;
			case "Level Vitesse d'attaque":
				// Augmente la vitesse d'attaque
				this.character.attackSpeed = (this.character.attackSpeed || 10) + 10;
				break;
			case 'Level Vitesse de déplacement':
				// Augmente la vitesse de déplacement
				this.character.movementSpeed = (this.character.movementSpeed || 5) + 5;
				break;
			case 'Level Dégâts':
				// Augmente les dégâts infligés
				this.character.attack = (this.character.attack || 10) + 10;
				break;
			default:
				console.log('Bonus inconnu:', selectedBonus);
				break;
		}
		// Ferme la modale et reprend le jeu
		this.resumeLevelup();
	}

	/**
	 * Reprise de la progression du niveau.
	 * Arrête la scène de montée de niveau et reprend la scène de jeu.
	 */
	resumeLevelup() {
		this.scene.resume('Game');
		this.scene.stop('LevelUp');
	}
}
