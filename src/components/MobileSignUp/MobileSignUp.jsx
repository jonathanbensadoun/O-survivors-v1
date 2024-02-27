// Importation des styles de MobileSignUp
import './MobileSignUp.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleTypingValuePseudo,
	handleTypingValuePassword,
	handleTypingValueEmail,
	handleSubmitFormSignUp,
	clearLoginData,
} from '../../store/userSlice';

// Composant MobileSignUp
export default function MobileSignUP() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const typingValuePseudo = useSelector(
		(state) => state.user.typingValuePseudo
	);
	const typingValuePassword = useSelector(
		(state) => state.user.typingValuePassword
	);
	const typingValueEmail = useSelector((state) => state.user.typingValueEmail);
	const logged = useSelector((state) => state.user.logged);
	const error = useSelector((state) => state.user.error);
	// fonction qui gère la soumission du formulaire
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormSignUp()); // On déclenche l'action 'handleSubmitFormSignUp' pour que le middleware puisse récupérer les données.
		dispatch({ type: 'SIGNUP' }); // On déclenche l'action 'SIGNUP' pour que le middleware puisse récupérer les données.
		dispatch(clearLoginData()); // On efface les données du formulaire
		logged && navigate('/signIn'); // Si l'utilisateur est connecté on le redirige vers la page de connexion
	};
	// On retourne le formulaire d'inscription
	return (
		<div className="Container-form-signUp-mobile">
			{/* Formulaire d'inscription */}
			<form action="" className="form-sign-up-mobile" onSubmit={handleSubmit}>
				<h1 className="form-sign-up-mobile__title">Inscription</h1>
				{/* // Si il y a une erreur on affiche le message d'erreur */}
				{error && <p className="errorMessage">{error}</p>}
				<label htmlFor="input-pseudo" className="form-sign-up-mobile__label">
					Pseudo
				</label>
				<input
					value={typingValuePseudo}
					autoComplete="username"
					required
					id="input-pseudo"
					type="text"
					name="username"
					className="form-sign-up-mobile__pseudo form-sign-up-mobile__input "
					onChange={(e) => {
						dispatch(handleTypingValuePseudo(e.target.value)); // On déclenche l'action 'handleTypingValuePseudo' pour récupérer la valeur de l'input
					}}
				/>
				<label htmlFor="input-email" className="form-sign-up-mobile__label">
					Email
				</label>
				<input
					value={typingValueEmail}
					autoComplete="email"
					required
					id="input-email"
					type="email"
					name="email"
					className="form-sign-up-mobile__pseudo form-sign-up-mobile__input "
					onChange={(e) => {
						dispatch(handleTypingValueEmail(e.target.value)); // On déclenche l'action 'handleTypingValueEmail' pour récupérer la valeur de l'input
					}}
				/>
				<label htmlFor="input-password" className="form-sign-up-mobile__label">
					Mot de passe
				</label>
				<input
					value={typingValuePassword}
					autoComplete="password"
					required
					minLength={8}
					id="input-password"
					type="password"
					name="password"
					className="form-sign-up-mobile__password form-sign-up-mobile__input"
					onChange={(e) => {
						dispatch(handleTypingValuePassword(e.target.value)); // On déclenche l'action 'handleTypingValuePassword' pour récupérer la valeur de l'input
					}}
				/>
				<div className="form-sign-up-mobile__container-btn">
					<button type="submit" className="form-sign-up-mobile__btn">
						S'inscrire
					</button>
				</div>
			</form>
		</div>
	);
}
