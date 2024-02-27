import './ChangePassword.scss';
// Importation des hooks de React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Importation des actions Redux
import {
	handleClickdDisconnect,
	handleTypingValueNewPassword,
	handleTypingValuePassword,
	handleTypingValueNewPasswordConfirmation,
	handleSubmitFormProfil,
} from '../../store/userSlice';

export default function ChangePassword() {
	const typingValuePassword = useSelector(
		(state) => state.user.typingValuePassword
	);
	const typingValueNewPassword = useSelector(
		(state) => state.user.typingValueNewPassword
	);
	const typingValueNewPasswordConfirmation = useSelector(
		(state) => state.user.typingValueNewPasswordConfirmation
	);
	const error = useSelector((state) => state.user.error);
	// useEffect qui dispatch une action pour récupérer les données de l'utilisateur
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'GET_AUTHORIZATION' });
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormProfil()); // On déclenche l'action 'handleSubmitFormProfil'
		dispatch({ type: 'MODIFY_USER_PASSWORD' }); // On déclenche l'action 'MODIFY_USER_PASSWORD' Pour que le middleware puisse récupérer les données.
	};
	return (
		<div className="profil">
			<form className="profil__form" action="" onSubmit={handleSubmit}>
				<h1 className="profil__title">Changer votre mot de passe</h1>
				<label className="profil__label" htmlFor="current-password">
					Ancien mot de passe :
				</label>
				<input
					autoComplete="current-password"
					value={typingValuePassword}
					className="profil__input"
					type="password"
					id="current-password"
					name="current-password"
					placeholder="********"
					required
					onChange={(e) => {
						dispatch(handleTypingValuePassword(e.target.value)); // On déclenche l'action 'handleTypingValuePassword' pour récupérer la valeur de l'input
					}}
				/>
				<label className="profil__label" htmlFor="newPassword">
					Nouveau mot de passe :
				</label>
				<input
					autoComplete="new-password"
					value={typingValueNewPassword}
					className="profil__input"
					id="newPassword"
					type="password"
					name="newPassword"
					placeholder="Saisissez le nouveau mot de passe "
					required
					onChange={(e) => {
						dispatch(handleTypingValueNewPassword(e.target.value)); // On déclenche l'action 'handleTypingValueNewPassword' pour récupérer la valeur de l'input
					}}
				/>
				<input
					autoComplete="new-password"
					value={typingValueNewPasswordConfirmation}
					className="profil__input"
					id="passwordConfirm"
					type="password"
					name="passwordConfirm"
					placeholder="Saisissez le nouveau mot de passe une 2e fois "
					required
					onChange={(e) => {
						dispatch(handleTypingValueNewPasswordConfirmation(e.target.value)); // On déclenche l'action 'handleTypingValueNewPasswordConfirmation' pour récupérer la valeur de l'input
					}}
				/>
				{error && <p className="errorMessage">{error}</p>}
				<div className="profil__container-btn">
					<button className="profil__submit" type="submit">
						soumettre
					</button>
					<button
						className="profil__deconnexion"
						type="bouton"
						onClick={() => {
							dispatch(handleClickdDisconnect()); // On déclenche l'action 'handleClickdDisconnect'
						}}
					>
						deconnexion
					</button>
				</div>
			</form>
		</div>
	);
}
