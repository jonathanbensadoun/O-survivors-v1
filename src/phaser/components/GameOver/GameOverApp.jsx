import GameOverFrame from './GameOverFrame';

export default function GameOverApp({
	stageName,
	survivedTime,
	coinsGained,
	levelReached,
	enemiesDefeated,
	onBackToMenu,
}) {
	return (
		<GameOverFrame
			stageName={stageName}
			survivedTime={survivedTime}
			coinsGained={coinsGained}
			levelReached={levelReached}
			enemiesDefeated={enemiesDefeated}
			onBackToMenu={onBackToMenu}
		/>
	);
}
