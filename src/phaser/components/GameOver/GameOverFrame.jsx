export default function GameOverFrame({
	stageName,
	survivedTime,
	coinsGained,
	levelReached,
	enemiesDefeated,
	onBackToMenu,
}) {
	return (
		<>
			<h1 className="game-over">game over</h1>
			<div className="game-over-result-container">
				<h2 className="game-over__title">Résultats</h2>
				<h2 className="game-over__subtitle">{stageName}</h2>
				<div className="game-over__text-container">
					<p className="game-over__text">Durée de survie</p>
					<p className="game-over__text">{survivedTime}</p>
				</div>
				<div className="game-over__text-container">
					<p className="game-over__text">Or gagné</p>
					<p className="game-over__text">{coinsGained}</p>
				</div>
				<div className="game-over__text-container">
					<p className="game-over__text">Niveau atteint</p>
					<p className="game-over__text">{levelReached}</p>
				</div>
				<div className="game-over__text-container">
					<p className="game-over__text">Ennemis vaincus</p>
					<p className="game-over__text">{enemiesDefeated}</p>
				</div>
			</div>
			<button
				className="main-menu__btn main-menu__btn--over"
				type="button"
				onClick={onBackToMenu}
			>
				Terminé
			</button>
		</>
	);
}
