// Importation des styles de Profil
import './Profil.scss';
// Importation des hooks de React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Importation du Link de react-router-dom
import { Link } from 'react-router-dom';
// Importation de la fonction handleClickdDisconnect
import {
	handleClickdDisconnect,
	handleTypingValueEmail,
	handleTypingValuePseudo,
	handleSubmitFormProfil,
} from '../../store/userSlice';

//composant Profil
export default function Profil() {
	const dispatch = useDispatch();
	// On récupère les données de l'utilisateur
	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	const typingValuePseudo = useSelector(
		(state) => state.user.typingValuePseudo
	);
	const typingValueEmail = useSelector((state) => state.user.typingValueEmail);
	const error = useSelector((state) => state.user.error);

	// useEffect qui dispatch une action pour récupérer les données de l'utilisateur
	useEffect(() => {
		dispatch({ type: 'GET_AUTHORIZATION' }); // On déclenche l'action 'GET_AUTHORIZATION' pour récupérer les données de l'utilisateur
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitFormProfil()); // On déclenche l'action 'handleSubmitFormProfil' pour que le middleware puisse récupérer les données.
		dispatch({ type: 'MODIFY_USER_DATA' }); // On déclenche l'action 'MODIFY_USER_DATA' pour que le middleware puisse récupérer les données.
	};
	return (
		<div className="profil">
			<form className="profil__form" action="" onSubmit={handleSubmit}>
				<div className="profil__container-title">
					<h1 className="profil__title">Profil</h1>
					<p className="profil__subtitle">Modifier votre profil</p>
				</div>
				<div className="profil__container-input">
					{error && <p className="errorMessage">{error}</p>}{' '}
					{/* Si il y a une erreur on affiche le message d'erreur */}
					<label className="profil__label" htmlFor="pseudo">
						Pseudo :
					</label>
					<input
						autoComplete="pseudo"
						type="text"
						name="pseudo"
						id="pseudo"
						value={typingValuePseudo}
						className="profil__input"
						placeholder={username}
						onChange={(e) => {
							dispatch(handleTypingValuePseudo(e.target.value)); // On déclenche l'action 'handleTypingValuePseudo' pour récupérer la valeur de l'input
						}}
					/>
					<label className="profil__label" htmlFor="email-profil">
						Email :
					</label>
					<input
						autoComplete="email"
						value={typingValueEmail}
						name="email-profil"
						className="profil__input"
						id="email-profil"
						type="email"
						placeholder={email}
						onChange={(e) => {
							dispatch(handleTypingValueEmail(e.target.value)); // On déclenche l'action 'handleTypingValueEmail' pour récupérer la valeur de l'input
						}}
					/>
					<Link className="profil__changePassword" to="/changer_mot_de_passe">
						Changer votre mot de passe
					</Link>
				</div>
				<div className="profil__container-btn">
					<button className="profil__submit" type="submit">
						soumettre
					</button>
					<button
						className="profil__deconnexion"
						type="button"
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
