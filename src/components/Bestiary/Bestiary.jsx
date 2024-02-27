import './Bestiary.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEndPointName } from '../../store/oSurvivorsSlice';

// Composant Bestiary
export default function Bestiary() {
	const dispatch = useDispatch();
	const enemies = useSelector((state) => state.oSurvivors.apiData); // On récupère les données de l'API

	useEffect(() => {
		dispatch(changeEndPointName('enemy')); // On change le nom de l'endpoint
		dispatch({ type: 'GET_DATA' }); // On déclanche l'action pour récupérer les données
	}, []);

	return (
		<div className="bestiary">
			<h1 className="bestiary__title">Bestiaire</h1>
			<div className="bestiary__container-card">
				{/* On map les données pour les afficher */}
				{enemies.map((enemy) => (
					<article className="bestiary__card" key={enemy.id}>
						<h2 className="bestiary__subtitle">{enemy.name}</h2>
						<div className="bestiary__container-img">
							<img
								src={`./img/gif/${enemy.name}.gif`}
								alt={enemy.name}
								className="bestiary__img"
							/>
						</div>
						<div className="bestiary__container-description">
							<p className="bestiary__description">
								Points de vie : {enemy.health}
							</p>
							<p className="bestiary__description">Puissance : {enemy.power}</p>
							<p className="bestiary__description">Vitesse : {enemy.speed} </p>
							<p className="bestiary__description">Expérience : {enemy.xp}</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
