// Importation des styles de ModalSignIn
import './ModalSignIn.scss';
// Importation de l'icon de croix
import { IoCloseSharp } from 'react-icons/io5';
// Importation du hook useDispatch de redux pour dispatch une action
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleClickBtnSignIn } from '../../store/oSurvivorsSlice';
import {
	handleTypingValuePseudo,
	handleTypingValuePassword,
	handleSubmitFormSignIn,
	clearLoginData,
} from '../../store/userSlice';
// Composant ModalSignIn
export default function ModalSignIn() {
	const dispatch = useDispatch();
	// Utilisation du hook useSelector de Redux pour obtenir des informations disponible dans le state du store
	const typingValuePseudo = useSelector(
		(state) => state.user.typingValuePseudo
	);
	const typingValuePassword = useSelector(
		(state) => state.user.typingValuePassword
	);
	const error = useSelector((state) => state.user.error);

	// Fonction qui gère la soumission du formulaire
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormSignIn()); // On déclenche l'action 'handleSubmitFormSignIn' pour que le middleware puisse récupérer les données.
		dispatch({ type: 'SUBMIT_LOGIN' }); // On déclenche l'action 'SUBMIT_LOGIN' pour que le middleware puisse récupérer les données.
		dispatch(clearLoginData()); // On efface les données du formulaire
	};
	return (
		<div className="container-form">
			<form action="" className="form-sign-up" onSubmit={handleSubmit}>
				<div className="container-close-icon">
					<IoCloseSharp
						className="form-sugn-up__close-icon"
						onClick={() => {
							dispatch(handleClickBtnSignIn());
						}}
					/>
				</div>
				<h2 className="form-sign-up__title">Se connecter</h2>
				<label htmlFor="input-pseudo" className="form-sign-up__label">
					Pseudo
				</label>
				<input
					autoComplete="username"
					value={typingValuePseudo}
					type="text"
					id="input-pseudo"
					name="userName"
					className="form-sign-up__pseudo form-sign-up__input "
					onChange={(e) => {
						dispatch(handleTypingValuePseudo(e.target.value));
					}}
					required
				/>

				<label htmlFor="input-password" className="form-sign-up__label">
					Mot de passe
				</label>
				<input
					autoComplete="password"
					value={typingValuePassword}
					minLength={8}
					id="input-password"
					type="password"
					name="password"
					className="form-sign-up__password form-sign-up__input"
					onChange={(e) => {
						dispatch(handleTypingValuePassword(e.target.value));
					}}
					required
				/>
				<Link to="mot-de-passe-oublié">mot de passe oublié ?</Link>

				{error && <p className="errorMessage">{error}</p>}

				<button type="submit" className="form-sign-up__btn">
					Se connecter
				</button>
			</form>
		</div>
	);
}
