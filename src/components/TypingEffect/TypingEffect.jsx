import { useState, useEffect } from 'react';

function TypingEffect() {
	// Utilise le hook useState pour créer une variable d'état et une fonction pour la mettre à jour
	const [introText, setIntroText] = useState('');
	const [index, setIndex] = useState(0);
	const text =
		"Plongez dans les ténèbres de la nuit, là où les vampires errent et les squelettes se lèvent pour semer la terreur. Bienvenue dans O'Survivors. Êtes-vous prêt à défier les forces de l'ombre et à devenir un véritable héros dans ce monde en proie au chaos ? Le destin de l'humanité repose entre vos mains.";

	useEffect(() => {
		/**
		 * Utilise un intervalle pour ajouter une lettre à l'introduction à chaque fois
		 * que l'index change.
		 */
		const interval = setInterval(() => {
			setIntroText((prevText) => prevText + text.charAt(index));
			setIndex((prevIndex) => prevIndex + 1);
		}, 15); // Efface le texte après 15 secondes

		// Efface l'intervalle si le composant est démonté
		return () => clearInterval(interval);
	}, [index]); // Re-run the effect when the index changes

	return <p className="intro-text">{introText}</p>;
}

export default TypingEffect;
