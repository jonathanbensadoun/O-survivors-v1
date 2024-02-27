// Importation des styles de ModalSignUp
import './ModalSignUp.scss';
// Importation de l'icon de croix
import { IoCloseSharp } from 'react-icons/io5';
// Importation des hooks de react-redux
import { useDispatch, useSelector } from 'react-redux';

import { handleClickBtnSignUp } from '../../store/oSurvivorsSlice';
import {
	handleTypingValuePseudo,
	handleTypingValuePassword,
	handleTypingValueEmail,
	handleSubmitFormSignUp,
	clearLoginData,
} from '../../store/userSlice';

// Composant ModalSignUp
export default function ModalSignUp() {
	// Utilisation du hook useDispatch de Redux pour dispatch une action
	const dispatch = useDispatch();

	// Utilisation du hook useSelector de Redux pour récupérer le state
	const typingValuePseudo = useSelector(
		(state) => state.user.typingValuePseudo
	);
	const typingValuePassword = useSelector(
		(state) => state.user.typingValuePassword
	);
	const typingValueEmail = useSelector((state) => state.user.typingValueEmail);
	const error = useSelector((state) => state.user.error);

	// Fonction qui ce déclenche lors de la soumission du formulaire
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormSignUp()); // On déclenche l'action 'handleSubmitFormSignUp' pour que le middleware puisse récupérer les données.
		dispatch({ type: 'SIGNUP' }); // On déclenche l'action 'SIGNUP' pour que le middleware puisse récupérer les données.
		dispatch(clearLoginData()); // On efface les données du formulaire
	};
	return (
		<div className="container-form">
			<form action="" className="form-sign-up" onSubmit={handleSubmit}>
				<div className="container-close-icon">
					<IoCloseSharp
						className="form-sign-up__close-icon"
						onClick={() => {
							dispatch(handleClickBtnSignUp());
						}}
					/>
				</div>
				<h2 className="form-sign-up__title">S'inscrire</h2>
				<label htmlFor="username" className="form-sign-up__label">
					Pseudo
				</label>
				<input
					autoComplete="username"
					value={typingValuePseudo}
					required
					type="text"
					id="username"
					name="username"
					className="form-sign-up__pseudo form-sign-up__input "
					onChange={(e) => {
						dispatch(handleTypingValuePseudo(e.target.value));
					}}
				/>
				<label htmlFor="email" className="form-sign-up__label">
					Email
				</label>
				<input
					autoComplete="email"
					value={typingValueEmail}
					required
					id="email"
					type="email"
					name="email"
					className="form-sign-up__email form-sign-up__input"
					onChange={(e) => {
						dispatch(handleTypingValueEmail(e.target.value));
					}}
				/>
				<label htmlFor="password" className="form-sign-up__label">
					Mot de passe
				</label>
				<input
					autoComplete="password"
					value={typingValuePassword}
					required
					minLength={8}
					id="password"
					type="password"
					name="password"
					className="form-sign-up__password form-sign-up__input"
					onChange={(e) => {
						dispatch(handleTypingValuePassword(e.target.value));
					}}
				/>
				{error && <p className="errorMessage">{error}</p>}
				<button type="submit" className="form-sign-up__btn">
					S'inscrire
				</button>
			</form>
		</div>
	);
}
