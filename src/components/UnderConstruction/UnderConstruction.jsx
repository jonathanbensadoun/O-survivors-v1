import './UnderConstruction.scss';

export default function UnderConstruction() {
	return (
		<div className="underConstruction">
			<div className="underConstruction__container-img">
				<img
					className="underConstruction__img"
					src="/img/under-construction.jpeg"
					alt=""
				/>
			</div>
			<div className="underConstruction__container-text">
				<h1 className="underConstruction__title">Page en construction</h1>
				<p>Le maitre est actuellement</p>
				<p>en train de travailler sur cette page.</p>
				<p>Reviens plus tard !</p>
			</div>
		</div>
	);
}
