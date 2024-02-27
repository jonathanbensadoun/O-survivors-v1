import { saveApiData } from '../oSurvivorsSlice';
import config from '../config'; // Importe le fichier de configuration

const middleware = (store) => (next) => (action) => {
	if (action.type === 'GET_DATA') {
		fetch(
			`${config.apiUrl}${config.apiVersion}/${
				store.getState().oSurvivors.endPointName
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log('data', data);
				store.dispatch(saveApiData(data)); // On dispatch l'action saveApiData pour stocker les données dans le state
			});
	}

	return next(action);
};

export default middleware;
