import config from '../config'; // Importe le fichier de configuration
import { showModalSucessChangeInfo } from '../oSurvivorsSlice';

const resetPasswordMiddleware = (store) => (next) => (action) => {
	if (action.type === 'MODIFY_NEW_PASSWORD') {
		const { newPassword, passwordConfirmation, token } = store.getState().user; // On récupère les données de l'utilisateur

		console.log(newPassword, passwordConfirmation);
		fetch(`${config.apiUrl}${config.apiVersion}/user/resetpassword`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				newPassword, // On envoie les données de l'utilisateur
				newPasswordConfirm: passwordConfirmation,
			}),
		})
			.then((res) => {
				if (res.ok) {
					store.dispatch(showModalSucessChangeInfo()); // Si on reçoit une réponse positive, on dispatch l'action showModalSuccessSignUp pour afficher un message de succès
					return res.json();
				}
			})
			.then((data) => console.log(data)); // On affiche en console les données de l'utilisateur
	}
	return next(action);
};
export default resetPasswordMiddleware;
