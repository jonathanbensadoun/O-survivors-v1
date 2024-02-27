export default function PauseComponent({
	musicVolume,
	soundVolume,
	onMusicChange,
	onSoundChange,
	onQuit,
	onBack,
}) {
	const handleMusicChange = (event) => {
		const { value } = event.target;
		onMusicChange(value);
	};

	const handleSoundChange = (event) => {
		const { value } = event.target;
		onSoundChange(value);
	};

	return (
		<div>
			<div className="settings-container">
				<h2 className="settings__title">Options</h2>
				<div className="music-container">
					<p className="settings__text">Musique</p>
					{/* Input range pour la musique */}
					<input
						className="music__range"
						type="range"
						min={0}
						max={100}
						value={musicVolume}
						onChange={handleMusicChange}
					/>
				</div>
				<div className="music-container">
					<p className="settings__text">Son</p>
					{/* Input range pour le son */}
					<input
						className="sound__range"
						type="range"
						min={0}
						max={100}
						value={soundVolume}
						onChange={handleSoundChange}
					/>
				</div>
			</div>
			<button
				className="main-menu__btn main-menu__btn--quit"
				type="button"
				onClick={onQuit}
			>
				Quitter
			</button>
			<button
				className="main-menu__btn main-menu__btn--resume"
				type="button"
				onClick={onBack}
			>
				Reprendre
			</button>
		</div>
	);
}
