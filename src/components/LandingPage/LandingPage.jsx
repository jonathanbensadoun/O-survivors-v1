// Importez les bibliothèques et composants nécessaires
import { Link } from 'react-router-dom';
import './LandingPage.scss'; // Importez les styles pour votre landing page si nécessaire
import TypingEffect from '../TypingEffect/TypingEffect';

// Définissez votre composant de landing page
function LandingPage() {
	return (
		<div className="landing-page-container bg">
			<TypingEffect />
			<Link to="/jeu">
				<button type="button" className="header__btn header__btn--play">
					Jouer maintenant
				</button>
			</Link>
		</div>
	);
}

export default LandingPage;
