export default function BackSceneBtn({ onBackScene }) {
	return (
		<button
			className="main-menu__btn main-menu__btn--back"
			type="button"
			onClick={onBackScene}
		>
			Retour
		</button>
	);
}
