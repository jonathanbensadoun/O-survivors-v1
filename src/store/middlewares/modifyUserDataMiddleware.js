import { getError } from '../userSlice';
import { showModalSucessChangeInfo } from '../oSurvivorsSlice';
import config from '../config'; // Importe le fichier de configuration

const modifyUserDataMiddleware = (store) => (next) => (action) => {
	// Si l'action est de type 'MODIFY_USER_DATA' alors on envoie une requête PATCH à l'API pour modifier les données de l'utilisateur
	if (action.type === 'MODIFY_USER_DATA') {
		// On récupère les données de l'utilisateur
		const userData = {
			username: store.getState().user.username,
			email: store.getState().user.email,
		};

		// On envoie une requête PATCH à l'API pour modifier les données de l'utilisateur
		fetch(`${config.apiUrl}${config.apiVersion}/user/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`, // On envoie le token de l'utilisateur pour s'authentifier
			},
			body: JSON.stringify(userData), // On envoie les données de l'utilisateur
		})
			.then((res) => res.json())
			.then((data) => {
				// On affiche en console les données de l'utilisateur
				console.log('data', data);
				if (data.error) {
					store.dispatch(getError(data.error)); // Si on reçoit une réponse négative, on dispatch l'action getError pour stocker le message d'erreur dans le state
				} else {
					store.dispatch(getError('')); // On vide le message d'erreur
					store.dispatch(showModalSucessChangeInfo()); // Si on reçoit une réponse positive, on dispatch l'action showModalSucessChangeInfo pour afficher un message de succès
				}
			});
	}
	return next(action);
};

export default modifyUserDataMiddleware;
