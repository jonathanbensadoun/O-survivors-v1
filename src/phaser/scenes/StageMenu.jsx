import { Scene } from 'phaser';
import ReactDOM from 'react-dom/client';
import MeadowStage from '../stages/MeadowStage';
import DesertStage from '../stages/DesertStage';
import CatacombsStage from '../stages/CatacombsStage';
import BackSceneBtn from '../components/BackSceneBtn';

/**
 * La scène du menu des stages, où le joueur peut choisir le stage pour jouer.
 */
export default class StageMenu extends Scene {
	constructor() {
		super('StageMenu');
	}

	/**
	 * Initialise les données transmises depuis la scène précédente.
	 * @param {object} data - Les données transmises depuis la scène précédente.
	 */
	async init(data) {
		this.selectedCharacter = data.selectedCharacter;
		this.playerCoins = data.playerCoins;
		this.stagesData = data.stagesData;
		this.selectedWeapon = data.selectedWeapon;
		this.audioManager = data.audioManager;
	}

	/**
	 * Précharge les images des sélections de stage.
	 */
	preload() {
		this.load.image('catacombs-selection', 'assets/ui/stageMenu/catacombs.png');
		this.load.image('desert-selection', 'assets/ui/stageMenu/desert.png');
		this.load.image('meadow-selection', 'assets/ui/stageMenu/meadow.png');
	}

	/**
	 * Crée les éléments visuels et les interactions du menu des stages.
	 */
	create() {
		this.gameContainer = document.querySelector('.GameContainer');
		this.menuContainer = document.createElement('div');
		this.menuContainer.classList.add('secondaryMenu-container');
		this.gameContainer.prepend(this.menuContainer);

		ReactDOM.createRoot(this.menuContainer).render(
			<BackSceneBtn onBackScene={this.gotoPreviousScene} />
		);

		this.width = this.scale.width;
		this.height = this.scale.height;

		this.confirmTextGroup = this.add.group();

		this.add.image(this.width / 2, this.height / 2, 'main-menu-bg');

		this.displayPlayerCoins();

		this.displayTitle();

		this.displayStageSelection();

		this.displayStageConfirmation();

		this.createEventListeners();

		this.displaySelectedStage(this.stagesData[0].description);

		this.displayConfirmBtn(CatacombsStage);

		this.audioManager.createStageSoundEffect();
	}

	/**
	 * Navigue vers la scène précédente lors du clic sur le bouton de retour.
	 */
	gotoPreviousScene = () => {
		this.gameContainer.removeChild(this.menuContainer);

		this.scene.start('CharacterMenu');
	};

	/**
	 * Affiche le nombre de pièces du joueur.
	 */
	displayPlayerCoins() {
		this.add.image(this.width / 2, 60, 'player-coins').setDepth(10);

		this.add
			.text(this.width / 2, 45, `${this.playerCoins ? this.playerCoins : 0}`, {
				fontFamily: 'VT323',
				fontSize: 28,
			})
			.setDepth(999);
	}

	/**
	 * Affiche le titre du menu des stages.
	 */
	displayTitle() {
		this.stageTitle = this.add
			.image(this.width / 2, this.height / 2 - 220, 'character-title')
			.setScale(2);

		this.add
			.text(this.stageTitle.x, this.stageTitle.y, 'SELECTION DU NIVEAU', {
				fontFamily: 'VT323',
				fontSize: 27,
				color: '#000000',
				stroke: 'black',
				strokeThickness: 1,
			})
			.setOrigin(0.5);
	}

	/**
	 * Affiche les options de sélection de stage.
	 */
	displayStageSelection() {
		this.stageSelection = this.add
			.image(this.stageTitle.x, this.stageTitle.y + 280, 'character-selection')
			.setScale(2);

		this.catacombsSelectionBtn = this.add
			.image(
				this.stageSelection.x - 161,
				this.stageSelection.y - 70,
				'catacombs-selection'
			)
			.setScale(2);

		this.catacombsSelectionBtn.setInteractive();

		this.catacombsText = this.add.text(
			this.catacombsSelectionBtn.x - 40,
			this.catacombsSelectionBtn.y - 55,
			'Catacombs',
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		this.desertSelectionBtn = this.add
			.image(
				this.stageSelection.x,
				this.stageSelection.y - 70,
				'desert-selection'
			)
			.setScale(2);

		this.desertSelectionBtn.setInteractive();

		this.desertText = this.add.text(
			this.desertSelectionBtn.x - 25,
			this.desertSelectionBtn.y - 55,
			'Desert',
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);

		this.meadowSelectionBtn = this.add
			.image(
				this.stageSelection.x + 161,
				this.stageSelection.y - 70,
				'meadow-selection'
			)
			.setScale(2);

		this.meadowSelectionBtn.setInteractive();

		this.meadowText = this.add.text(
			this.meadowSelectionBtn.x - 30,
			this.meadowSelectionBtn.y - 55,
			'Prairie',
			{
				fontFamily: 'VT323',
				fontSize: 22,
			}
		);
	}

	/**
	 * Affiche la zone de confirmation du stage sélectionné.
	 */
	displayStageConfirmation() {
		this.stageConfirmation = this.add
			.image(
				this.stageSelection.x,
				this.stageSelection.y + 90,
				'character-confirmation'
			)
			.setScale(2);
	}

	/**
	 * Efface le texte de confirmation du stage.
	 */
	clearConfirmationDisplay() {
		if (this.confirmTextGroup) {
			this.confirmTextGroup.clear(true, true);
		}
	}

	/**
	 * Affiche le stage sélectionné dans la zone de confirmation.
	 * @param {string} stage - Le nom du stage sélectionné.
	 */
	displaySelectedStage(stage) {
		this.clearConfirmationDisplay();

		this.textConfirmation = this.add.text(
			this.stageSelection.x - 210,
			this.stageSelection.y + 30,
			`${stage}`,
			{
				fontFamily: 'VT323',
				fontSize: 22,
				wordWrap: { width: 300 },
			}
		);

		this.confirmTextGroup.add(this.textConfirmation);
	}

	/**
	 * Crée les écouteurs d'événements pour les boutons de sélection de stage.
	 */
	createEventListeners() {
		this.catacombsSelectionBtn.on('pointerdown', () => {
			this.clearConfirmationDisplay();
			let catacombsStage;
			if (this.stagesData) {
				catacombsStage = this.stagesData[0].description;
			}
			this.displaySelectedStage(catacombsStage);

			this.displayConfirmBtn(CatacombsStage);
		});

		this.desertSelectionBtn.on('pointerdown', () => {
			this.clearConfirmationDisplay();
			let desertStage;
			if (this.stagesData) {
				desertStage = this.stagesData[1].description;
			}
			this.displaySelectedStage(desertStage);
			this.displayConfirmBtn(DesertStage);
		});

		this.meadowSelectionBtn.on('pointerdown', () => {
			this.clearConfirmationDisplay();
			let meadowStage;
			if (this.stagesData) {
				meadowStage = this.stagesData[2].description;
			}
			this.displaySelectedStage(meadowStage);
			this.displayConfirmBtn(MeadowStage);
		});
	}

	/**
	 * Affiche le bouton de confirmation pour le stage sélectionné.
	 * @param {class} Stage - La classe représentant le stage sélectionné.
	 */
	displayConfirmBtn(Stage) {
		this.stageConfirmBtn = this.add
			.image(
				this.stageConfirmation.x + 152,
				this.stageConfirmation.y + 22,
				'character-confirmation-btn'
			)
			.setScale(2);

		this.stageConfirmBtn.setInteractive();

		this.stageConfirmBtn.on('pointerdown', () => {
			this.startGame(Stage, this.selectedCharacter, this.selectedWeapon);
		});

		this.confirmStageText = this.add
			.text(this.stageConfirmBtn.x, this.stageConfirmBtn.y, 'Confirmer', {
				fontFamily: 'VT323',
				fontSize: 25,
				color: 'black',
			})
			.setOrigin(0.5);

		this.confirmTextGroup.add(this.confirmStageText);
	}

	/**
	 * Démarre le jeu avec le stage sélectionné, le personnage et l'arme choisis.
	 * @param {class} Map - La classe représentant le stage sélectionné.
	 * @param {class} Character - La classe du personnage sélectionné.
	 * @param {class} Weapon - La classe de l'arme sélectionnée.
	 */
	startGame(Map, Character, Weapon) {
		this.gameContainer.removeChild(this.menuContainer);

		this.sound.play('click3', { volume: this.audioManager.getSoundVolume() });

		this.selectedWeapon = Weapon;
		this.selectedMap = Map;
		this.selectedCharacter = Character;

		this.scene.start('Game', {
			audioManager: this.audioManager,
			selectedMap: this.selectedMap,
			selectedCharacter: this.selectedCharacter,
			playerCoins: this.playerCoins,
			selectedWeapon: this.selectedWeapon,
		});
	}
}
