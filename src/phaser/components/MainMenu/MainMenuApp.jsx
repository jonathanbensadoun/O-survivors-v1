import { useState } from 'react';
import Title from './Title';
import Buttons from './Buttons';
import SettingsModal from './Settings';

export default function MainMenuApp({
	menuMusicVolume,
	menuSoundVolume,
	onStartGame,
	onVolumeChange,
}) {
	const [isSettingsVisible, setSettingsVisible] = useState(this);

	const [musicVolume, setMusicVolume] = useState(menuMusicVolume);
	const [soundVolume, setSoundVolume] = useState(menuSoundVolume);

	const toggleSettingsModal = () => {
		setSettingsVisible(!isSettingsVisible);
	};

	const handleMusicChange = (value) => {
		setMusicVolume(value);
		onVolumeChange({ musicVolume: value, soundVolume });
	};

	const handleSoundChange = (value) => {
		setSoundVolume(value);
		onVolumeChange({ musicVolume, soundVolume: value });
	};

	return (
		<div className="main-menu-container">
			{/* <CoinPurse playerCoins={playerCoins} /> */}
			<Title />
			<Buttons onStartGame={onStartGame} onSettings={toggleSettingsModal} />
			{isSettingsVisible && (
				<SettingsModal
					musicVolume={musicVolume}
					soundVolume={soundVolume}
					onMusicChange={handleMusicChange}
					onSoundChange={handleSoundChange}
					onClose={toggleSettingsModal}
				/>
			)}
		</div>
	);
}
