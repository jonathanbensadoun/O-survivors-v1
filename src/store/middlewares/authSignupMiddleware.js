import { showModalSuccessSignUp } from '../oSurvivorsSlice';
import { getError } from '../userSlice';
import config from '../config';

const authSignupMiddleware = (store) => (next) => async (action) => {
	// Appel à l'API pour s'inscrire quand on déclenche l'action 'SIGNUP'
	if (action.type === 'SIGNUP') {
		try {
			const response = await fetch(
				`${config.apiUrl}${config.apiVersion}/user/signup`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					// On envoie les données du formulaire
					body: JSON.stringify({
						username: store.getState().user.username,
						password: store.getState().user.password,
						email: store.getState().user.email,
					}),
				}
			);
			//
			const data = await response.json();
			console.log('data', data);
			if (data.error) {
				// Si on reçoit une erreur, on dispatch l'action getError
				const errorAction = getError(data.error);
				store.dispatch(errorAction);
			} else {
				store.dispatch(showModalSuccessSignUp()); // Si on reçoit une réponse positive, on dispatch l'action showModalSuccessSignUp pour afficher un message de succès
			}
		} catch (error) {
			console.error(error);
		}
	}

	return next(action);
};

export default authSignupMiddleware;
