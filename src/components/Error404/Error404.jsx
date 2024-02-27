import './Error404.scss';

export default function Error404() {
	return (
		<div className="error">
			<div className="error_container-img">
				<img className="error__img" src="/img/ERROR-404.jpeg" alt="" />
			</div>
			<div className="error__container-text">
				<p>Malheureux !</p>
				<p>Tu t'es trompé de route</p>
				<p>Fuis avant qu'il ne soit trop tard.</p>
				<p className="error__404">Error 404</p>
			</div>
		</div>
	);
}
