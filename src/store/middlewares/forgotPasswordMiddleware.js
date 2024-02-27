import config from '../config'; // Importe le fichier de configuration
import { showModalSucessforgotPassword } from '../oSurvivorsSlice';
import { getError } from '../userSlice';

const forgotPasswordMiddleware = (store) => (next) => (action) => {
	if (action.type === 'SEND_EMAIL_FORGOT_PASSWORD') {
		const userEmail = store.getState().user.email;
		console.log('action', store.getState().user.email);

		fetch(`${config.apiUrl}${config.apiVersion}/user/requestreset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: userEmail }),
		})
			.then((res) => {
				if (res.ok) {
					store.dispatch(showModalSucessforgotPassword()); // Si on reçoit une réponse positive, on dispatch l'action showModalSuccessSignUp pour afficher un message de succès
					store.dispatch(getError('')); // On dispatch l'action getError pour vider le message d'erreur
					return res.json();
				} else {
					store.dispatch(getError('Email non trouvé')); // Si on reçoit une erreur, on dispatch l'action getError
				}
			})
			.then((data) => {
				console.log(data);
			});
	}

	return next(action);
};

export default forgotPasswordMiddleware;
