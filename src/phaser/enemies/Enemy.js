import Phaser from 'phaser';
import LootPV from '../items/LootPV';
import LootXP from '../items/LootXP';
import LootCoin from '../items/LootCoin';

/**
 * Classe de base représentant un ennemi dans le jeu.
 * Cette classe hérite de Phaser.Physics.Arcade.Sprite et fournit des fonctionnalités de base pour les ennemis du jeu.
 */
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Crée un nouvel objet ennemi.
	 * @param {Phaser.Scene} scene - La scène à laquelle l'ennemi appartient.
	 * @param {number} x - La position horizontale initiale de l'ennemi.
	 * @param {number} y - La position verticale initiale de l'ennemi.
	 * @param {string} texture - La texture à utiliser pour l'ennemi.
	 * @param {Phaser.Physics.Arcade.Sprite} character - Le personnage principal (joueur) que l'ennemi doit attaquer.
	 */
	constructor(scene, x, y, texture, character) {
		super(scene, x, y, character);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Propriétés spécifiques à l'ennemi
		this.character = character;
		this.body.setSize(this.width * 0.8, this.height * 0.8);
	}

	/**
	 * Met à jour l'état de l'ennemi à chaque frame.
	 */
	update() {
		// Gestion du déplacement de l'ennemi et de son comportement en fonction de la position du personnage principal
		this.setVelocity(0);

		// Calcule la direction horizontale entre l'ennemi et le personnage principal
		const characterPositionX = this.character.x;
		const enemyPositionX = this.x;
		const directionX = characterPositionX - enemyPositionX;

		// Arrête l'animation si l'ennemi est collé au personnage
		if (this.health > 0) {
			if (directionX !== 0) {
				// Déplace l'ennemi vers le personnage principal s'il n'est pas collé à lui
				this.scene.physics.moveToObject(this, this.character, this.speed);
			} else {
				this.anims.stop();
			}

			// Joue l'animation de course dans la direction appropriée
			if (directionX > 2) {
				this.anims.play(`${this.name}_run`, true); // Joue l'animation de course vers la droite
				this.scaleX = 1; // Rétablit l'échelle normale de l'ennemi
				this.body.offset.x = 25; // Ajuste le décalage horizontal du corps physique
				this.body.offset.y = 30; // Ajuste le décalage vertical du corps physique
			} else {
				this.anims.play(`${this.name}_run`, true); // Joue l'animation de course vers la gauche
				this.scaleX = -1; // Inverse l'échelle de l'ennemi pour qu'il regarde vers la gauche
				this.body.offset.x = 80; // Ajuste le décalage horizontal du corps physique
				this.body.offset.y = 30; // Ajuste le décalage vertical du corps physique
			}
		}

		// Ajuste la profondeur de l'ennemi en fonction de sa position par rapport au personnage principal
		if (this.y < this.character.y) {
			this.setDepth(1); // Met l'ennemi devant le personnage s'il est en dessous
		} else {
			this.setDepth(3); // Met l'ennemi derrière le personnage s'il est au-dessus
		}
	}

	/**
	 * Inflige des dégâts à l'ennemi et gère les effets associés.
	 * @param {number} attack - La quantité de dégâts infligée.
	 */
	takeDamage(attack) {
		// Vérifie si l'ennemi est déjà mort
		if (this.isDead) {
			return;
		}
		if (this.health > 0) {
			// Réduit la santé de l'ennemi en fonction des dégâts infligés
			this.health -= attack;

			// Joue un effet sonore de prise de dégâts
			this.scene.sound.play('hurt1', {
				volume: this.scene.audioManager.getSoundVolume(),
			});
		}

		// Vérifie si l'ennemi est mort après avoir subi les dégâts
		if (this.health <= 0) {
			// Joue un effet sonore de mort de l'ennemi
			this.scene.sound.play('dead1', {
				volume: this.scene.audioManager.getSoundVolume(),
			});

			// Marque l'ennemi comme mort et déclenche les actions associées à sa mort
			this.isDead = true;
			this.enemyKilled();

			// Génère du butin aléatoire en fonction d'un pourcentage
			const randomNb = Phaser.Math.Between(0, 100);
			if (randomNb <= 50) {
				const lootXP = new LootXP(this.scene, this.x, this.y + 20, 'gem-icon');
				this.scene.lootsXP.add(lootXP);
				lootXP.setBodySize(75, 75).setDepth(0);
			} else if (randomNb === 97 || randomNb === 98) {
				const lootPV = new LootPV(this.scene, this.x, this.y + 20, 'lootPV');
				this.scene.lootsPV.add(lootPV);
				lootPV.setBodySize(75, 75).setDepth(0);
			} else if (randomNb > 51) {
				const lootCoin = new LootCoin(this.scene, this.x, this.y + 20, 'coin');
				this.scene.lootsCoin.add(lootCoin);
				lootCoin.setBodySize(75, 75).setDepth(0);
			}

			// Déclenche l'animation de mort de l'ennemi et le détruit lorsque l'animation est terminée
			this.anims.play(`${this.name}_death`);
			this.once('animationcomplete', () => {
				this.destroy();
			});
		}
	}

	/**
	 * Méthode appelée lorsque l'ennemi est tué.
	 * Incrémente le compteur d'ennemis tués dans la scène et met à jour l'affichage du compteur dans l'interface utilisateur.
	 */
	enemyKilled() {
		// Incrémente le compteur d'ennemis tués dans la scène
		this.scene.enemiesKilled += 1;

		// Met à jour l'affichage du compteur d'ennemis tués dans l'interface utilisateur
		this.scene.uiManager.updateKillCounter();
	}
}
