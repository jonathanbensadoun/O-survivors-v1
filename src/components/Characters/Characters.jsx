import './Characters.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEndPointName } from '../../store/oSurvivorsSlice';

export default function Characters() {
	const dispatch = useDispatch(); // On récupère la fonction dispatch de Redux
	const characters = useSelector((state) => state.oSurvivors.apiData);
	useEffect(() => {
		dispatch(changeEndPointName('character')); // On change le nom de l'endpoint
		dispatch({ type: 'GET_DATA' }); // On déclanche l'action pour récupérer les données
	}, []);
	return (
		<div className="characters">
			<h1 className="characters__title">Les Personnages</h1>
			<div className="characters__container-card">
				{/* On map les données pour les afficher */}
				{characters.map((character) => (
					<article className="characters__card" key={character.id}>
						<h2 className="characters__subtitle">{character.name}</h2>
						<div className="characters__container-img">
							<img
								src={`./img/gif/${character.name}.gif`}
								alt={character.name}
								className="characters__img"
							/>
						</div>
						<div className="characters__container-description">
							<p className="characters__description">
								arme : {character.weapon_name}
							</p>
							<p className="characters__description">
								Conditions de débloquage : {character.unlock_requirement}
							</p>
							<p className="characters__description">coût : {character.cost}</p>
							<p className="characters__description">
								description : {character.description}
							</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
