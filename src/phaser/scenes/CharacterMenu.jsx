import { Scene } from 'phaser';
import ReactDOM from 'react-dom/client';
import Wizard from '../characters/Wizard';
import Rogue from '../characters/Rogue';
import Knight from '../characters/Knight';
import DataManager from '../utils/DataManager';
import WizardStaff from '../weapons/WizardStaff';
import Sword from '../weapons/Sword';
import Daggers from '../weapons/Daggers';
import BackSceneBtn from '../components/BackSceneBtn';

// TODO refactoriser/refaire la scene

export default class CharacterMenu extends Scene {
	constructor() {
		super('CharacterMenu');
	}

	async init(data) {
		this.playerUnlockedCharacters = data.playerUnlockedCharacters;
		this.characters = data.charactersData;
		this.playerCoins = data.playerCoins;
		this.audioManager = data.audioManager;

		try {
			this.dataManager = new DataManager(this);
			this.stagesData = await this.dataManager.getAllStagesData();
		} catch (error) {
			console.error('Erreur lors de la récupération des données:', error);
		}
	}

	preload() {
		this.load.setPath('assets');

		this.load.image(
			'character-confirmation-btn',
			'ui/characterMenu/character-confirmation-btn.png'
		);
		this.load.image(
			'character-confirmation',
			'ui/characterMenu/character-confirmation.png'
		);
		this.load.image('player-coins', 'ui/characterMenu/player-coins.png');
		this.load.image(
			'character-knight-locked',
			'ui/characterMenu/character-knight-locked.png'
		);
		this.load.image(
			'character-knight-unlocked',
			'ui/characterMenu/character-knight-unlocked.png'
		);
		this.load.image(
			'character-rogue-locked',
			'ui/characterMenu/character-rogue-locked.png'
		);
		this.load.image(
			'character-rogue-unlocked',
			'ui/characterMenu/character-rogue-unlocked.png'
		);
		this.load.image(
			'character-selection',
			'ui/characterMenu/character-selection.png'
		);
		this.load.image('character-title', 'ui/characterMenu/character-title.png');
		this.load.image(
			'character-wizard-unlocked',
			'ui/characterMenu/character-wizard-unlocked.png'
		);
		this.load.image('coin', 'ui/characterMenu/coin.png');
		this.load.image('wizard-unlocked', 'ui/characterMenu/wizard-unlocked.png');
		this.load.image('knight-locked', 'ui/characterMenu/knight-locked.png');
		this.load.image('knight-unlocked', 'ui/characterMenu/knight-unlocked.png');
		this.load.image('rogue-locked', 'ui/characterMenu/rogue-locked.png');
		this.load.image('rogue-unlocked', 'ui/characterMenu/rogue-unlocked.png');
	}

	create() {
		this.width = this.scale.width;
		this.height = this.scale.height;

		this.gameContainer = document.querySelector('.GameContainer');
		this.menuContainer = document.createElement('div');
		this.menuContainer.classList.add('secondaryMenu-container');
		this.gameContainer.prepend(this.menuContainer);

		ReactDOM.createRoot(this.menuContainer).render(
			<BackSceneBtn onBackScene={this.gotoPreviousScene} />
		);

		this.selectTextGroup = this.add.group();
		this.confirmTextGroup = this.add.group();
		this.confirmImageGroup = this.add.group();

		this.add.image(this.width / 2, this.height / 2, 'main-menu-bg');

		this.audioManager.createCharacterSoundEffect();

		this.displayPlayerCoins();
		this.displayTitle();
		this.displayCharacterSelection();

		this.displayCharacterConfirmation();
		this.createEventListeners();

		this.displaySelectedCharacter(
			112,
			22,
			'wizard-unlocked',
			this.characters[0]
		);

		this.displayConfirmBtn(Wizard, WizardStaff);
	}

	gotoPreviousScene = () => {
		this.gameContainer.removeChild(this.menuContainer);

		this.scene.start('MainMenu');
	};

	displayTitle() {
		this.characterTitle = this.add
			.image(this.width / 2, this.height / 2 - 220, 'character-title')
			.setScale(2);

		this.add
			.text(
				this.characterTitle.x,
				this.characterTitle.y,
				'SELECTION DU PERSONNAGE',
				{
					fontFamily: 'VT323',
					fontSize: 27,
					color: '#000000',
					stroke: 'black',
					strokeThickness: 1,
				}
			)
			.setOrigin(0.5);
	}

	displayCharacterSelection() {
		this.characterSelection = this.add
			.image(
				this.characterTitle.x,
				this.characterTitle.y + 280,
				'character-selection'
			)
			.setScale(2);

		this.wizardSelectionBtn = this.add
			.image(
				this.characterSelection.x - 161,
				this.characterSelection.y - 70,
				'character-wizard-unlocked'
			)
			.setScale(2);

		this.wizardSelectionBtn.setInteractive();

		const wizardNameText = this.add.text(
			this.wizardSelectionBtn.x - 55,
			this.wizardSelectionBtn.y - 55,
			`${this.characters[0].name}`,
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		if (this.playerUnlockedCharacters) {
			this.isKnightUnlocked = this.playerUnlockedCharacters.find(
				(obj) => obj.character_name === 'Jettelot'
			);
			this.isRogueUnlocked = this.playerUnlockedCharacters.find(
				(obj) => obj.character_name === 'Fourbass'
			);
		}

		if (this.isKnightUnlocked === undefined) {
			this.knightSelectionBtn = this.add
				.image(
					this.characterSelection.x,
					this.characterSelection.y - 70,
					'character-knight-locked'
				)
				.setScale(2);
		} else {
			this.knightSelectionBtn = this.add
				.image(
					this.characterSelection.x,
					this.characterSelection.y - 70,
					'character-knight-unlocked'
				)
				.setScale(2);
		}
		this.knightSelectionBtn.setInteractive();

		const knightNameText = this.add.text(
			this.knightSelectionBtn.x - 55,
			this.knightSelectionBtn.y - 55,
			`${this.characters[1].name}`,
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		if (this.isRogueUnlocked === undefined) {
			this.rogueSelectionBtn = this.add
				.image(
					this.characterSelection.x + 161,
					this.characterSelection.y - 70,
					'character-rogue-locked'
				)
				.setScale(2);
		} else {
			this.rogueSelectionBtn = this.add
				.image(
					this.characterSelection.x + 161,
					this.characterSelection.y - 70,
					'character-rogue-unlocked'
				)
				.setScale(2);
		}

		this.rogueSelectionBtn.setInteractive();

		const rogueNameText = this.add.text(
			this.rogueSelectionBtn.x - 55,
			this.rogueSelectionBtn.y - 55,
			`${this.characters[2].name}`,
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		this.selectTextGroup.addMultiple([
			wizardNameText,
			knightNameText,
			rogueNameText,
		]);
	}

	displayCharacterConfirmation() {
		this.characterConfirmation = this.add
			.image(
				this.characterSelection.x,
				this.characterSelection.y + 90,
				'character-confirmation'
			)
			.setScale(2);
	}

	clearConfirmationDisplay() {
		this.confirmTextGroup.clear(true, true);
		this.confirmImageGroup.clear(true, true);
	}

	displaySelectedCharacter(deltaX, deltaY, texture, character) {
		this.clearConfirmationDisplay();

		this.selectedCharacterImage = this.add
			.image(
				this.characterConfirmation.x - deltaX - 35,
				this.characterConfirmation.y + deltaY + 8,
				texture
			)
			.setScale(2);

		this.confirmImageGroup.add(this.selectedCharacterImage);

		this.textConfirmation = this.add.text(
			this.characterSelection.x - 210,
			this.characterSelection.y + 30,
			`${character.fullname}`,
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		this.confirmTextGroup.add(this.textConfirmation);
	}

	displayConfirmBtn(Character, Weapon) {
		this.characterConfirmBtn = this.add
			.image(
				this.characterConfirmation.x + 152,
				this.characterConfirmation.y + 22,
				'character-confirmation-btn'
			)
			.setScale(2);

		this.characterConfirmBtn.setInteractive();

		this.characterConfirmBtn.on('pointerdown', () => {
			this.startGame(Character, Weapon);
		});

		this.confirmImageGroup.add(this.characterConfirmBtn);

		this.confirmCharacterText = this.add
			.text(
				this.characterConfirmBtn.x,
				this.characterConfirmBtn.y,
				'Confirmer',
				{
					fontFamily: 'VT323',
					fontSize: 25,
					color: 'black',
				}
			)
			.setOrigin(0.5);

		this.confirmTextGroup.add(this.confirmCharacterText);
	}

	displayBuyBtn(character) {
		this.characterConfirmBtn = this.add
			.image(
				this.characterConfirmation.x + 152,
				this.characterConfirmation.y + 22,
				'character-confirmation-btn'
			)
			.setScale(2);

		this.characterConfirmBtn.setInteractive();

		this.confirmImageGroup.add(this.characterConfirmBtn);
		this.buyCharacterText = this.add
			.text(this.characterConfirmBtn.x, this.characterConfirmBtn.y, 'Acheter', {
				fontFamily: 'VT323',
				fontSize: 25,
				color: 'black',
			})
			.setOrigin(0.5);

		this.confirmTextGroup.add(this.buyCharacterText);

		this.coin = this.add
			.image(
				this.characterConfirmBtn.x - 20,
				this.characterConfirmBtn.y - 50,
				'coin'
			)
			.setScale(1.5);

		this.confirmImageGroup.add(this.coin);

		this.costText = this.add.text(
			this.coin.x + 20,
			this.coin.y - 13,
			`${character.cost}`,
			{
				fontFamily: 'VT323',
				fontSize: 25,
			}
		);

		this.confirmTextGroup.add(this.costText);
	}

	createEventListeners() {
		this.wizardSelectionBtn.on('pointerdown', () => {
			this.displaySelectedCharacter(
				112,
				22,
				'wizard-unlocked',
				this.characters[0]
			);

			this.displayConfirmBtn(Wizard, WizardStaff);
		});

		this.knightSelectionBtn.on('pointerdown', () => {
			this.clearConfirmationDisplay();

			if (this.isKnightUnlocked === undefined) {
				this.displaySelectedCharacter(
					130,
					24,
					'knight-locked',
					this.characters[1]
				);

				this.displayBuyBtn(this.characters[1], Knight);

				this.characterConfirmBtn.on('pointerdown', () => {
					if (
						this.characters[1].cost > this.playerCoins ||
						this.playerCoins === undefined
					) {
						return;
					}

					this.dataManager.updateUnlockedCharacter(this.characters[1].id);
					this.updatedPlayerCoins = this.playerCoins - this.characters[1].cost;
					this.dataManager.updateOwnedCoins(this.updatedPlayerCoins);
					this.updateDisplayPlayerCoins();

					this.clearConfirmationDisplay();
					this.displaySelectedCharacter(
						115,
						10,
						'knight-unlocked',
						this.characters[1]
					);
					this.knightSelectionBtn.destroy();
					this.knightSelectionBtn = this.add
						.image(
							this.characterSelection.x,
							this.characterSelection.y - 70,
							'character-knight-unlocked'
						)
						.setScale(2);
					this.add.text(
						this.knightSelectionBtn.x - 55,
						this.knightSelectionBtn.y - 55,
						`${this.characters[1].name}`,
						{
							fontFamily: 'VT323',
							fontSize: 22,
						}
					);
					this.knightSelectionBtn.setInteractive();
					this.knightSelectionBtn.on('pointerdown', () => {
						this.displaySelectedCharacter(
							115,
							10,
							'knight-unlocked',
							this.characters[1]
						);
						this.displayConfirmBtn(Knight, Sword);
					});
					this.displayConfirmBtn(Knight, Sword);
				});
			} else {
				this.displaySelectedCharacter(
					115,
					10,
					'knight-unlocked',
					this.characters[1]
				);
				this.displayConfirmBtn(Knight, Sword);
			}
		});

		this.rogueSelectionBtn.on('pointerdown', () => {
			this.clearConfirmationDisplay();

			if (this.isRogueUnlocked === undefined) {
				this.displaySelectedCharacter(
					130,
					24,
					'rogue-locked',
					this.characters[2]
				);

				this.displayBuyBtn(this.characters[2], Rogue);

				this.characterConfirmBtn.on('pointerdown', () => {
					if (
						this.characters[2].cost > this.playerCoins ||
						this.playerCoins === undefined
					) {
						return;
					}

					this.dataManager.updateUnlockedCharacter(this.characters[2].id);
					this.updatedPlayerCoins = this.playerCoins - this.characters[2].cost;
					this.dataManager.updateOwnedCoins(this.updatedPlayerCoins);
					this.updateDisplayPlayerCoins();

					this.clearConfirmationDisplay();
					this.displaySelectedCharacter(
						115,
						24,
						'rogue-unlocked',
						this.characters[2]
					);
					this.rogueSelectionBtn.destroy();
					this.rogueSelectionBtn = this.add
						.image(
							this.characterSelection.x + 161,
							this.characterSelection.y - 70,
							'character-rogue-unlocked'
						)
						.setScale(2);
					this.add.text(
						this.rogueSelectionBtn.x - 55,
						this.rogueSelectionBtn.y - 55,
						`${this.characters[2].name}`,
						{
							fontFamily: 'VT323',
							fontSize: 22,
						}
					);
					this.rogueSelectionBtn.setInteractive();
					this.rogueSelectionBtn.on('pointerdown', () => {
						this.displaySelectedCharacter(
							115,
							24,
							'rogue-unlocked',
							this.characters[2]
						);
						this.displayConfirmBtn(Rogue, Daggers);
					});
					this.displayConfirmBtn(Rogue, Daggers);
				});
			} else {
				this.displaySelectedCharacter(
					115,
					24,
					'rogue-unlocked',
					this.characters[2]
				);
				this.displayConfirmBtn(Rogue, Daggers);
			}
		});
	}

	displayPlayerCoins() {
		this.add.image(this.width / 2, 60, 'player-coins').setDepth(10);

		this.cointText = this.add
			.text(this.width / 2, 45, `${this.playerCoins ? this.playerCoins : 0}`, {
				fontFamily: 'VT323',
				fontSize: 28,
			})
			.setDepth(999);
	}

	updateDisplayPlayerCoins() {
		this.cointText.setText(`${this.updatedPlayerCoins}`);
	}

	startGame(Character, Weapon) {
		this.gameContainer.removeChild(this.menuContainer);

		if (this.updatedPlayerCoins === undefined) {
			this.updatedPlayerCoins = this.playerCoins;
		}
		// this.clickSound = this.sound.add('click2');
		this.sound.play('click2', { volume: this.audioManager.getSoundVolume() });
		// Récupération du personnage séléctionné
		this.selectedCharacter = Character;

		this.selectedWeapon = Weapon;
		// Chargement de la scène StageMenu en lui passant le personnage séléctionné
		this.scene.start('StageMenu', {
			audioManager: this.audioManager,
			selectedWeapon: this.selectedWeapon,
			selectedCharacter: this.selectedCharacter,
			stagesData: this.stagesData,
			playerCoins: this.updatedPlayerCoins,
		});
	}
}
