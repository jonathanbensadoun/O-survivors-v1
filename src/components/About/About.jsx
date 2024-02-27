import './About.scss';

export default function About() {
	return (
		<div className="about">
			<h1 className="about__title">À propos</h1>
			<h2 className="about__subtitle">Introduction</h2>

			<p className="about__paragraph">
				Nous sommes des élèves de l'école O'clock, une école de développement
				web. Nous avons opté pour la formation développeur web fullstack de 6
				mois, comprenant 1 mois de projet et 1 mois de spécialisation en
				front-end ou en back-end.
			</p>
			<h2 className="about__subtitle">Apprentissage</h2>

			<p className="about__paragraph">
				Au cours des 4 mois d'apprentissage, nous avons été formés sur les bases
				du développement web, comprenant : - HTML, CSS - DOM - Serveur (Node.js,
				Express) - Base de données (PostgreSQL, MongoDB) - API - Websocket
				Arrivés au 5e mois, nous avons dû choisir une spécialisation entre
				front-end (React/Redux) ou back-end (Sqitch/Joy/JWT). À la fin de la
				spécialisation, nous avons eu à sélectionner un projet proposé par les
				étudiants de la promotion pour le présenter devant un jury dans le cadre
				de l'obtention du titre professionnel.
			</p>

			<h2 className="about__subtitle">Projet</h2>

			<p className="about__paragraph">
				Le projet est composé de 5 développeurs dont 2 front-end et 3 back-end.
				Les rôles on été attribué en fonction des compétences de chacun. - Denis
				Pianelli (product owner) - Gaultier Souris (Scrum Master) - Alexandre
				Gachelin (référent technique phaser) - Kevin BOISNE (lead développeur
				backend) - Jonathan Bensadoun (lead développeur frontend) Nous tenons à
				préciser que bien que Phaser ne fasse pas initialement partie de notre
				formation, nous avons pris l'initiative de nous familiariser avec cet
				outil pendant le mois dédié au projet, en visionnant diverses vidéos
				explicatives sur son fonctionnement. Notre passion pour les jeux vidéo
				nous a motivés à collaborer avec Denis (product owner) pour développer
				une version inspirée du célèbre jeu en ligne Vampire Survivors !
			</p>

			<h2 className="about__subtitle">Remerciement</h2>

			<p className="about__paragraph">
				Après des heures de travail acharné sur le développement du jeu, nous
				sommes ravis de vous présenter O'Survivors ! Nous espérons que vous
				apprécierez pleinement l'expérience de jeu. L'équipe O'Survivors vous
				remercie et se tient à votre disposition pour toute question via notre
				page de contact.
			</p>
		</div>
	);
}
