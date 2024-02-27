// Importation des styles du Footer
import './Footer.scss';

// Importation de Link depuis react-router-dom
import { Link } from 'react-router-dom';

// Composant fonctionnel Footer
export default function Footer() {
	return (
		<ul className="footer">
			{/* Utilisation de Link pour naviguer vers la page de contact */}
			<Link to="/contact" className="link">
				<li className="footer__list">Contact</li>
			</Link>

			{/* Utilisation de Link pour naviguer vers la page des Mentions Légales */}
			<Link to="/mentions-legales" className="link">
				<li className="footer__list">Mentions Légales</li>
			</Link>

			{/* Utilisation de Link pour naviguer vers la page de Politique de confidentialité */}
			<Link to="/politique-de-confidentialitée" className="link">
				<li className="footer__list">Politique de confidentialitée</li>
			</Link>

			{/* Utilisation de Link pour naviguer vers la page de Politique de confidentialité */}
			<Link to="/credits" className="link">
				<li className="footer__list">Crédits</li>
			</Link>
		</ul>
	);
}
