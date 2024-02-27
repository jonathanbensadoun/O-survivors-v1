import { updateDataByUserRecovery } from '../userSlice.js';
import config from '../config.js'; // Importe le fichier de configuration

const userRecoveryMiddleware = (store) => (next) => (action) => {
	// Si l'action est de type 'GET_AUTHORIZATION' alors on envoie une requête GET à l'API pour récupérer les données de l'utilisateur
	if (action.type === 'GET_AUTHORIZATION') {
		const token = localStorage.getItem('token'); // On récupère le token de l'utilisateur
		// Appel à l'API pour récupérer les données de l'utilisateur
		fetch(`${config.apiUrl}${config.apiVersion}/user/`, {
			headers: {
				Authorization: `Bearer ${token}`, // On envoie le token de l'utilisateur pour s'authentifier
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// On met à jour les données de l'utilisateur
				const userDataMappings = [
					{ dataName: 'email', dataValue: data.email },
					{ dataName: 'id', dataValue: data.id },
					{ dataName: 'password', dataValue: data.password },
					{ dataName: 'role', dataValue: data.role },
					{ dataName: 'username', dataValue: data.username },
					{ dataName: 'coins', dataValue: data.coins },
					{ dataName: 'typingValueEmail', dataValue: data.email },
					{ dataName: 'typingValuePseudo', dataValue: data.username },
				];
				// On met à jour les données de l'utilisateur dans le store
				userDataMappings.forEach(({ dataName, dataValue }) => {
					store.dispatch(updateDataByUserRecovery({ dataName, dataValue }));
				});
			});
	}
	return next(action);
};
export default userRecoveryMiddleware;
