import { useState } from 'react';
import PauseComponent from './PauseComponent';

export default function PauseApp({
	menuMusicVolume,
	menuSoundVolume,
	onVolumeChange,
	onQuit,
	onBack,
}) {
	const [musicVolume, setMusicVolume] = useState(menuMusicVolume);
	const [soundVolume, setSoundVolume] = useState(menuSoundVolume);

	const handleMusicChange = (value) => {
		setMusicVolume(value);
		onVolumeChange({ musicVolume: value, soundVolume });
	};

	const handleSoundChange = (value) => {
		setSoundVolume(value);
		onVolumeChange({ musicVolume, soundVolume: value });
	};
	return (
		<PauseComponent
			musicVolume={musicVolume}
			soundVolume={soundVolume}
			onMusicChange={handleMusicChange}
			onSoundChange={handleSoundChange}
			onQuit={onQuit}
			onBack={onBack}
		/>
	);
}
