// Importation des styles de Legal
import './Credits.scss';

// Informations sur les crédits
const credits = [
	{ id: 0, role: 'Product Owner', name: 'Denis Pianelli' },
	{ id: 1, role: 'Scrum Master', name: 'Gaultier Souris' },
	{ id: 2, role: 'Référent technique (Phaser)', name: 'Alexandre Gachelin' },
	{ id: 3, role: 'Lead Développeur backend', name: 'Kevin Boisne' },
	{ id: 4, role: 'Lead Développeur frontend', name: 'Jonathan Bensadoun' },
];

// Composant Legal
export default function Credits() {
	return (
		<div className="credits">
			<div className="credits__container-img">
				<img
					className="credits__img"
					src="/img/credits.jpg"
					alt="image d'un magicien disant merci"
				/>
			</div>
			<div className="credits__container">
				<h1 className="credits__title">Crédits</h1>
				{/*  On map les données pour les afficher */}
				{credits.map((credit) => (
					<div key={credit.id} className="credits__container-detail">
						<h2 className="credits__subtitle">{credit.role}:</h2>
						<p className="credits__name">{credit.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
