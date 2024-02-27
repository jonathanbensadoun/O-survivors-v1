// Importation des styles de MobileSignIn
import './MobileSignIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleTypingValuePseudo,
	handleTypingValuePassword,
	handleSubmitFormSignIn,
	clearLoginData,
} from '../../store/userSlice';

// Composant MobileSignIn
export default function MobileSignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const typingValuePseudo = useSelector(
		(state) => state.user.typingValuePseudo
	);
	const typingValuePassword = useSelector(
		(state) => state.user.typingValuePassword
	);
	const logged = useSelector((state) => state.user.logged);
	const error = useSelector((state) => state.user.error); // On récupère les données du store

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormSignIn()); // On déclenche l'action 'handleSubmitFormSignIn' pour que le middleware puisse récupérer les données.
		dispatch({ type: 'SUBMIT_LOGIN' }); // On déclenche l'action 'SUBMIT_LOGIN' pour que le middleware puisse récupérer les données.
		dispatch(clearLoginData()); // On efface les données du formulaire
		logged && navigate('/'); // Si l'utilisateur est connecté on le redirige vers la page d'accueil
	};

	return (
		<div className="Container-form-signIn-mobile">
			{/* Formulaire de connexion */}
			<form action="" className="form-sign-in-mobile" onSubmit={handleSubmit}>
				<h1 className="form-sign-in-mobile__title">Connexion</h1>
				{/* // Si il y a une erreur on affiche le message d'erreur */}
				{error && <p className="errorMessage">{error}</p>}
				<label htmlFor="input-pseudo" className="form-sign-in-mobile__label">
					Pseudo
				</label>
				<input
					required
					value={typingValuePseudo}
					type="text"
					name="username"
					className="form-sign-in__pseudo form-sign-in-mobile__input "
					onChange={(e) => {
						dispatch(handleTypingValuePseudo(e.target.value));
					}}
				/>

				<label htmlFor="input-password" className="form-sign-in-mobile__label">
					Mot de passe
				</label>
				<input
					required
					value={typingValuePassword}
					type="password"
					name="password"
					minLength={8}
					className="form-sign-in__password form-sign-in-mobile__input"
					onChange={(e) => {
						dispatch(handleTypingValuePassword(e.target.value));
					}}
				/>
				<div className="form-sign-in-mobile__container-btn">
					<button type="submit" className="form-sign-in-mobile__btn">
						Connexion
					</button>
				</div>
				{/* Lien vers la page d'inscription */}
				<div className="container-link-signUp">
					<p className="container-link-signUp__paragraph">
						Première connexion ?
						<Link to="/signup" className="container-link-signUp__link link">
							créez votre profil
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
