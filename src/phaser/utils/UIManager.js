/**
 * Classe représentant le gestionnaire de l'interface utilisateur.
 */
export default class UIManager {
	/**
	 * Crée une instance de UIManager.
	 * @param {Phaser.Scene} scene - La scène à laquelle le gestionnaire de l'interface utilisateur est associé.
	 */
	constructor(scene) {
		this.scene = scene;
	}

	/**
	 * Initialise l'interface utilisateur en créant différents éléments tels que la barre de santé, le compteur de kills, etc.
	 */
	init() {
		this.createHUD();
		this.createHealthBar();
		this.createKillCounter();
		this.createCoinCounter();
		this.createGameTimeCounter();
	}

	/**
	 * Crée la barre de santé du personnage.
	 */
	createHUD() {
		this.width = this.scene.scale.width;
		this.height = this.scene.scale.height;

		this.xpBar = this.scene.add
			.image(this.width / 2, this.height - 138, 'xpbar')
			.setDepth(10)
			.setScale(1.002);

		this.xpBar.setScrollFactor(0);

		// Initialisation de la barre d'XP, similaire à la barre de santé
		this.xpBarBackground = this.scene.add
			.graphics({
				fillStyle: { color: 0x1c1c1c },
			})
			.setDepth(5);

		this.xpBarFill = this.scene.add
			.graphics({ fillStyle: { color: 0x2e64fe } })
			.setDepth(6); // Couleur pour l'XP

		// Fixer la barre d'XP et le texte à la caméra
		this.xpBarBackground.setScrollFactor(0);
		this.xpBarFill.setScrollFactor(0);

		// Texte pour l'XP actuelle, ajusté pour rester fixe par rapport à la caméra
		this.xpText = this.scene.add
			.text(this.width - 250, this.height - 144, '', {
				fontSize: '11px',
				fill: '#FFFFFF',
			})
			.setScrollFactor(0) // Empêche le texte de défiler avec la caméra
			.setDepth(88);

		this.updateXPBar();
	}

	/**
	 * Crée le compteur de kills.
	 */
	createHealthBar() {
		this.scene.healthBar = this.scene.add.graphics().setDepth(999);
	}

	/**
	 * Crée le compteur de kills.
	 */
	createKillCounter() {
		this.killIcon = this.scene.add
			.image(
				this.scene.scale.width / 2 + 150,
				this.scene.scale.height / 2 - 240,
				'kill-icon'
			)
			.setDepth(999)
			.setScrollFactor(0);
		// Compteur de kills
		this.scene.killCounterText = this.scene.add
			.text(this.killIcon.x + 30, this.killIcon.y - 10, '0', {
				fontFamily: 'VT323',
				fontSize: 20,
				fill: '#FFF',
			})
			.setDepth(999)
			.setScrollFactor(0); // Fixer le texte à la caméra
	}

	/**
	 * Crée le compteur de pièces.
	 */
	createCoinCounter() {
		this.coinIcon = this.scene.add
			.image(
				this.scene.scale.width / 2 + 250,
				this.scene.scale.height / 2 - 240,
				'coin'
			)
			.setScrollFactor(0);

		this.scene.coinCounterText = this.scene.add
			.text(this.coinIcon.x + 30, this.coinIcon.y - 10, '0', {
				fontSize: 20,
				fontFamily: 'VT323',
			})
			.setDepth(999)
			.setScrollFactor(0);
	}

	/**
	 * Crée le compteur de temps de jeu.
	 */
	createGameTimeCounter() {
		// Crée un événement d'horloge pour suivre le temps écoulé en jeu
		this.scene.gameTimeClock = this.scene.time.addEvent({
			delay: 300000, // Intervalle de mise à jour du temps (300000ms = 5 minutes)
		});

		// Crée un événement d'horloge pour mettre à jour l'affichage du temps de jeu
		this.scene.updateTimeClock = this.scene.time.addEvent({
			delay: 1000, // Intervalle de mise à jour de l'affichage (1000ms = 1 seconde)
			callback: this.updateGameTimeCounter, // Fonction de rappel appelée à chaque mise à jour
			callbackScope: this, // Portée dans laquelle la fonction de rappel est appelée
			loop: true, // Indique que l'événement d'horloge se répète indéfiniment
		});

		// Crée un texte pour afficher le temps de jeu à l'écran
		this.scene.timeText = this.scene.add
			.text(
				this.scene.scale.width / 2, // Position X du texte au centre de l'écran
				this.scene.scale.height / 2 - 240, // Position Y du texte en haut de l'écran
				'00:00', // Texte initial représentant le temps de jeu
				{
					fontFamily: 'VT323',
					fontSize: 25,
				}
			)
			.setDepth(999) // Profondeur pour s'assurer que le texte est au premier plan
			.setScrollFactor(0); // Empêche le texte de défiler avec la caméra
	}

	/**
	 * Met à jour le compteur de temps de jeu.
	 */
	updateGameTimeCounter() {
		// Calcule le temps écoulé en secondes
		const elapsedSeconds = Math.floor(
			this.scene.gameTimeClock.getElapsedSeconds()
		);

		// Calcule le nombre de minutes écoulées
		const minutes = Math.floor(elapsedSeconds / 60);

		// Calcule le nombre de secondes restantes après les minutes
		const seconds = elapsedSeconds % 60;

		// Met à jour le texte affichant le temps de jeu au format "MM:SS"
		this.scene.timeText.setText(
			`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
		);
	}

	/**
	 * Met à jour la barre d'expérience du personnage.
	 */
	updateXPBar() {
		this.xpBarBackground.clear();
		this.xpBarFill.clear();

		const barWidth = this.width / 1.5; // Largeur de la barre d'XP
		const barHeight = 16; // Hauteur de la barre d'XP
		const barX = 0; // Centrer en X
		const barY = this.height - 150; // Position Y de la barre d'XP sur l'écran

		// Dessiner le fond de la barre d'XP
		this.xpBarBackground.fillRect(175, barY, barWidth, barHeight);

		// Calculer et dessiner le remplissage de la barre d'XP
		const fillWidth =
			barWidth * (this.scene.character.xp / this.scene.character.xpToNextLevel);
		this.xpBarFill.fillRect(barX + 175, barY, fillWidth, barHeight);
		// Mise à jour du texte de l'XP
		this.xpText.setText(`LVL ${this.scene.character.level}`);
	}

	/**
	 * Met à jour le compteur de kills.
	 */
	updateKillCounter() {
		this.scene.killCounterText
			.setText(`${this.scene.enemiesKilled}`)
			.setDepth(100); // Premier Plan
	}

	/**
	 * Met à jour la barre de santé du personnage.
	 */
	updateHealthBar() {
		if (this.scene.character.isDead) {
			return;
		}
		const screenWidth = this.scene.scale.width;
		const screenHeight = this.scene.scale.height;

		const x = screenWidth / 2 - 20;
		const y = screenHeight / 2 + 40;

		// Dimensions de la barre de vie
		const width = 40;
		const height = 5;

		// Taille du contour
		const outlinePadding = 1;

		// Fond de la barre de vie (contour)
		this.scene.healthBar.fillStyle(0x000000);
		this.scene.healthBar.fillRect(
			x - outlinePadding,
			y - outlinePadding,
			width + outlinePadding * 2,
			height + outlinePadding * 2
		);

		// Fond de la barre de vie (gris)
		this.scene.healthBar.fillStyle(0x808080);
		this.scene.healthBar.fillRect(x, y, width, height);

		// Barre de santé actuelle
		this.scene.healthBar.fillStyle(0xff0000);
		const healthWidth =
			width * (this.scene.character.health / this.scene.character.maxHealth);
		this.scene.healthBar.fillRect(x, y, healthWidth, height);

		this.scene.healthBar.setScrollFactor(0);
	}
}
