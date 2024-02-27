// Importation des styles de MainMobile
import './MainMobile.scss';
import { Link } from 'react-router-dom';

//Composant MainMobile
export default function MainMobile() {
	return (
		<div className="main">
			<p className="main__paragraph">
				Veuillez-vous connecter à un Ordinateur pour acceder au jeu !
			</p>
		</div>
	);
}
