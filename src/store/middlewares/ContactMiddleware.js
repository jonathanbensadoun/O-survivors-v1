import config from '../config'; // Importe le fichier de configuration
import { showMessageOk } from '../oSurvivorsSlice';

const contactMiddleware = (store) => (next) => (action) => {
	if (action.type === 'SUBMIT_CONTACT') {
		const message = {
			email: store.getState().user.email,
			message:
				store.getState().user.email + ' : ' + store.getState().user.message,
		};

		fetch(`${config.apiUrl}${config.apiVersion}/contact`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message), // On envoie les données du formulaire
		})
			.then((res) => {
				store.dispatch(showMessageOk(true)); // On dispatch l'action showMessageOk pour afficher un message de succès
				return res.json();
			})
			.then((data) => console.log(data));
	}

	return next(action);
};

export default contactMiddleware;
