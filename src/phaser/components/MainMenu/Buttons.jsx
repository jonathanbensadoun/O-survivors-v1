export default function Buttons({ onStartGame, onSettings }) {
	return (
		<div className="btn-container">
			<button className="main-menu__btn" type="button" onClick={onStartGame}>
				commencer
			</button>
			<button className="main-menu__btn" type="button" onClick={onSettings}>
				options
			</button>
		</div>
	);
}
