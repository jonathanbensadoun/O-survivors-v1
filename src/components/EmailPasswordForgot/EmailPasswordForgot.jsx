import './EmailPasswordForgot.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signInSuccesFull } from '../../store/oSurvivorsSlice';
import {
	handleTypingValueEmail,
	handleSubmitFormSignUp,
} from '../../store/userSlice';

export default function EmailPasswordForgot() {
	// On récupère les données du store
	const typingValueEmail = useSelector((state) => state.user.typingValueEmail);
	const error = useSelector((state) => state.user.error);

	const dispatch = useDispatch(); // On récupère la fonction dispatch de Redux pour déclencher les actions

	useEffect(() => {
		dispatch(signInSuccesFull()); // On déclenche l'action 'signInSuccesFull' pour que le middleware puisse récupérer les données.
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormSignUp());
		dispatch({ type: 'SEND_EMAIL_FORGOT_PASSWORD' }); // On déclenche l'action 'SEND_EMAIL_FORGOT_PASSWORD' pour que le middleware puisse récupérer les données.
	};

	return (
		<div className="passwordForgot">
			<div className="passwordForgot__container-img">
				<img
					className="passwordForgot__img"
					src="/img/contact.jpeg"
					alt="un sorcier qui envoit un mail"
				/>
			</div>
			<form
				className="passwordForgot__form"
				action="POST"
				onSubmit={handleSubmit} // On déclenche la fonction handleSubmit au submit du formulaire
			>
				<h1 className="passwordForgot__title">Mot de Passe oublié</h1>
				<p className="passwordForgot__subtitle">
					renseignez votre adresse mail
				</p>
				<div className="passwordForgot__container-description">
					<label className="passwordForgot__label" htmlFor="mail">
						Email
					</label>
					<input
						value={typingValueEmail}
						className="passwordForgot__input"
						id="mail"
						type="email"
						placeholder="Entrez votre adresse email"
						onChange={(e) => {
							dispatch(handleTypingValueEmail(e.target.value)); // On déclenche l'action 'handleTypingValueEmail' pour récupérer la valeur de l'input
						}}
						required
					/>
				</div>
				{error && <p className="errorMessage">{error}</p>}
				<button className="passwordForgot__submit" type="submit">
					soumettre
				</button>
			</form>
		</div>
	);
}
