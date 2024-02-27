// Description: Middleware qui gère la connexion d'un utilisateur.
import { signInSuccesFull } from '../oSurvivorsSlice.js';
import { handleSuccessfulLogin, getError, getCoins } from '../userSlice';

import config from '../config';
// Middleware qui gère la connexion d'un utilisateur

const authMiddleware = (store) => (next) => async (action) => {
	// Si l'action est de type SUBMIT_LOGIN
	if (action.type === 'SUBMIT_LOGIN') {
		try {
			const response = await fetch(
				`${config.apiUrl}${config.apiVersion}/user/signin`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					// On envoie les données de connexion stockées dans le state
					body: JSON.stringify({
						username: store.getState().user.username,
						password: store.getState().user.password,
					}),
				}
			);
			const data = await response.json();
			if (data.error) {
				const errorAction = getError(data.error); // Si on reçoit une réponse négative, on dispatch l'action getError pour stocker le message d'erreur dans le state
				store.dispatch(errorAction); // On dispatch l'action
			} else {
				// Si on reçoit une réponse positive, on stocke le token et le nom d'utilisateur dans le localStorage
				localStorage.setItem('token', data.token);
				localStorage.setItem('username', data.username);
				localStorage.setItem('coins', data.coins);
				localStorage.setItem('logged', true);
				// On dispatch l'action handleSuccessfulLogin
				const loginAction = handleSuccessfulLogin(true);
				store.dispatch(loginAction);
				store.dispatch(signInSuccesFull());
				const coinsAction = getCoins(data.coins);
				store.dispatch(coinsAction);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return next(action);
};

export default authMiddleware;
