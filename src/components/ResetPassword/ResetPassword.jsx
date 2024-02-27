import './ResetPassword.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	handleTypingValueNewPassword,
	handleTypingValueNewPasswordConfirmation,
	handleSubmitFormProfil,
	getError,
	getToken,
} from '../../store/userSlice';

export default function ResetPassword() {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Récupération du token dans l'url
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get('token');
	// On dispatch l'action 'getToken' pour récupérer le token et l'enregistrer dans le store
	dispatch(getToken(token));

	const typingValueNewPassword = useSelector(
		(state) => state.user.typingValueNewPassword
	);
	const typingValueNewPasswordConfirmation = useSelector(
		(state) => state.user.typingValueNewPasswordConfirmation
	);
	const error = useSelector((state) => state.user.error);

	const handleSubmit = (e) => {
		e.preventDefault();
		// On vérifie si les deux mots de passe correspondent
		if (typingValueNewPassword === typingValueNewPasswordConfirmation) {
			dispatch(handleSubmitFormProfil()); // On déclenche l'action 'handleSubmitFormProfil' pour que le middleware puisse récupérer les données.
			dispatch({ type: 'MODIFY_NEW_PASSWORD' }); // On déclenche l'action 'MODIFY_NEW_PASSWORD' pour que le middleware puisse récupérer les données.
			navigate('/'); // On redirige l'utilisateur vers la page d'accueil
		} else {
			// Si les mots de passe ne correspondent pas on affiche un message d'erreur
			dispatch(
				getError(
					'Le nouveau mot de passe et la confirmation ne correspondent pas.'
				)
			);
		}
	};

	return (
		<div className="reset">
			<div className="reset__container-img">
				<img className="reset__img" src="/img/contact.jpeg" alt="" />
			</div>
			<form className="reset__form" action="" onSubmit={handleSubmit}>
				<h1 className="reset__title">Changer mot de passe</h1>
				<p className="reset__subtitle">renseignez votre nouveau mot de passe</p>
				<div className="reset__container-description">
					<label className="reset__label" htmlFor="password">
						nouveau mot de passe
					</label>
					<input
						value={typingValueNewPassword}
						className="reset__input"
						id="password"
						type="password"
						onChange={(e) => {
							dispatch(handleTypingValueNewPassword(e.target.value)); // On déclenche l'action 'handleTypingValueNewPassword' pour récupérer la valeur de l'input
						}}
						required
					/>
					<label className="reset__label" htmlFor="comfirmPassword">
						confirmation nouveau mot de passe
					</label>
					<input
						value={typingValueNewPasswordConfirmation}
						className="reset__input"
						id="comfirmPassword"
						type="password"
						onChange={(e) => {
							dispatch(
								handleTypingValueNewPasswordConfirmation(e.target.value) // On déclenche l'action 'handleTypingValueNewPasswordConfirmation' pour récupérer la valeur de l'input
							);
						}}
					/>
					{error && <p className="errorMessage">{error}</p>}{' '}
					{/* Si il y a une erreur on affiche le message d'erreur */}
				</div>
				<button className="reset__submit" type="submit">
					soumettre
				</button>
			</form>
		</div>
	);
}
