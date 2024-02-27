import './PrivacyPolicy.scss';

export default function PrivacyPolicy() {
	return (
		<div className="privacyPolicy">
			<h1 className="privacyPolicy__title">Politique de confidentialitée</h1>
			<h2 className="privacyPolicy__subtitle">
				Collecte et Utilisation d'Informations Personnelles
			</h2>

			<p className="privacyPolicy__paragraph">
				Nous pouvons collecter des informations personnelles telles que votre
				nom, votre adresse e-mail et d'autres informations d'identification
				lorsque vous utilisez notre site web. Ces informations seront utilisées
				uniquement dans le but pour lequel elles ont été fournies.
			</p>
			<h2 className="privacyPolicy__subtitle">Cookies</h2>
			<p className="privacyPolicy__paragraph">
				Notre site web utilise des cookies pour améliorer l'expérience
				utilisateur. Ces cookies peuvent collecter des informations telles que
				votre adresse IP, le type de navigateur, le temps passé sur le site et
				les pages visitées. Vous pouvez désactiver les cookies dans les
				paramètres de votre navigateur.
			</p>
			<h2 className="privacyPolicy__subtitle">
				Partage d'Informations Personnelles
			</h2>
			<p className="privacyPolicy__paragraph">
				Nous ne partagerons pas vos informations personnelles avec des tiers
				sans votre consentement, sauf si requis par la loi.
			</p>
			<h2 className="privacyPolicy__subtitle">
				Sécurité des Informations Personnelles
			</h2>
			<p className="privacyPolicy__paragraph">
				Nous mettons en place des mesures de sécurité pour protéger vos
				informations personnelles contre l'accès non autorisé, la divulgation,
				l'altération ou la destruction.
			</p>
			<h2 className="privacyPolicy__subtitle">Liens vers des Sites Tiers</h2>
			<p className="privacyPolicy__paragraph">
				Notre site web peut contenir des liens vers des sites tiers. Nous ne
				sommes pas responsables des pratiques de confidentialité de ces sites et
				vous encourageons à lire leurs politiques de confidentialité.
			</p>
			<h2 className="privacyPolicy__subtitle">
				Modifications de la Politique de Confidentialité
			</h2>
			<p className="privacyPolicy__paragraph">
				Nous nous réservons le droit de modifier notre politique de
				confidentialité à tout moment. Les modifications seront publiées sur
				cette page.
			</p>
			<p className="privacyPolicy__paragraph">
				En utilisant notre site web, vous consentez à notre politique de
				confidentialité.
			</p>
		</div>
	);
}
