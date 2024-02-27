// Importation des styles du GameContainer
import './GameContainer.scss';

// Importation des modules React
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
// Importation des modules Phaser
import Phaser from 'phaser';
// Importation des scènes Phaser
import Preloader from '../../phaser/scenes/Preloader';
import Boot from '../../phaser/scenes/Boot';
import StartScreen from '../../phaser/scenes/StartScreen';
import MainMenu from '../../phaser/scenes/MainMenu';
import Game from '../../phaser/scenes/Game';
import StageMenu from '../../phaser/scenes/StageMenu';
import CharacterMenu from '../../phaser/scenes/CharacterMenu';
import Pause from '../../phaser/scenes/Pause';
import LevelUp from '../../phaser/scenes/LevelUp';
import GameOver from '../../phaser/scenes/GameOver';

// Composant fonctionnel GameContainer
export default function GameContainer() {
	// Utilisation d'une référence pour accéder à l'élément DOM du jeu
	const gameRef = useRef();

	useEffect(() => {
		// Configuration du jeu Phaser
		const config = {
			type: Phaser.AUTO,
			width: 1024,
			height: 768,
			// Options de mise à l'échelle du jeu

			// Configuration du moteur de physique
			physics: {
				default: 'arcade', // Utilisation du moteur d'arcade par défaut
				arcade: {
					gravity: { y: 0 }, // Gravité du monde du jeu
					debug: false, // Activation du mode débogage
				},
			}, // L'élément parent où le jeu sera attaché dans le DOM
			parent: gameRef.current,
			// Déclaration des scènes du jeu
			scene: [
				Boot,
				Preloader,
				StartScreen,
				MainMenu,
				CharacterMenu,
				StageMenu,
				Game,
				Pause,
				LevelUp,
				GameOver,
			],
			scale: {
				zoom: 1,
			},
			// Options d'affichage
			pixelArt: true, // Utilisation du rendu Pixel Art
			roundPixels: false, // Arrondissement des pixels pour éviter le crénelage
		};
		// Création de l'instance du jeu Phaser
		const game = new Phaser.Game(config);
		gameRef.current = game;

		return () => {
			game.destroy();
		};
	}, []); // on met un tableau vide pour que le useEffect ne se lance qu'une fois

	return (
		<>
			{/* Utilisation de la référence pour accéder à l'élément DOM */}
			<div className="GameContainer" ref={gameRef} />
		</>
	);
}
