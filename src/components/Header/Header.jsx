// Importation des styles du Header
import './Header.scss';

// Importation des icônes
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

// Importation des hooks Redux
import { useDispatch, useSelector } from 'react-redux';

// Importation de Link de react-router-dom
import { Link } from 'react-router-dom';

// Actions Redux
import {
	handleClickBtnSignUp,
	handleClickBtnSignIn,
	handleClickMenuBurger,
	handleClickLogo,
	toggleDropdown,
} from '../../store/oSurvivorsSlice';

// Composant Header
export default function Header({ isDesktopOrLaptop }) {
	const dispatch = useDispatch();

	const isDropdownOpen = useSelector(
		(state) => state.oSurvivors.isDropdownOpen
	);
	const logged = useSelector((state) => state.user.logged);
	const username = useSelector((state) => state.user.username);
	const coins = useSelector((state) => state.user.coins);

	const handleDropdownClick = () => {
		dispatch(toggleDropdown());
	};

	return (
		<div className="header">
			{/* Lien vers la page d'accueil */}
			<Link
				to="/"
				className="header__link"
				onClick={() => {
					dispatch(handleClickLogo());
				}}
			>
				<img
					className="logo-small"
					src="/img/o-survivors-logo-header.png"
					alt="small logo osurvivor"
				/>
			</Link>
			{/*  Affichage du pseudo de l'utilisateur si il est connecté et que l'appareil est un mobile sinon on affiche le menu de navigation */}
			{!isDesktopOrLaptop ? (
				<div>
					{logged && (
						<div className="container-coins">
							<img src="./img/coin.png" alt="" />
							<p> {coins}</p>
							<h2 className="header__pseudo">{username}</h2>
						</div>
					)}
				</div>
			) : (
				<nav className="header__nav">
					<ul>
						<li>
							<Link to="/">Accueil</Link>
						</li>
						<li className="dropdown" onClick={handleDropdownClick}>
							<div className="dropdown">
								Découvrir
								<div>
									{/*  On affiche la flèche vers le haut ou le bas en fonction de l'état du dropdown */}
									{isDropdownOpen ? <GoTriangleUp /> : <GoTriangleDown />}
								</div>
							</div>
							{/*On affiche le contenu du dropdown si il est ouvert  */}
							{isDropdownOpen && (
								<div className="dropdown-content">
									<Link to="/guide">Guide</Link>
									<Link to="/personnages">Personnages</Link>
									<Link to="/bestiaire">Bestiaire</Link>
									<Link to="/armes">Armes</Link>
									<Link to="/items">Items</Link>
								</div>
							)}
						</li>

						<li>
							<Link to="/lore">Lore</Link>
						</li>
						<li>
							<Link to="/a-propos">À propos</Link>
						</li>
						<li>
							<Link to="/jeu">Jouer</Link>
						</li>
					</ul>
				</nav>
			)}

			{/* Affichage du bouton de menu hamburger pour les appareils mobiles */}
			{!isDesktopOrLaptop ? (
				<Link to="/">
					<GiHamburgerMenu
						onClick={() => {
							dispatch(handleClickMenuBurger());
						}}
					/>
				</Link>
			) : (
				// Contenu spécifique pour les ordinateurs de bureau
				<div className="header__container-btn">
					{!logged ? (
						// Contenu à afficher si l'utilisateur n'est pas connecté
						<>
							<button
								className="header__btn"
								type="button"
								onClick={() => {
									dispatch(handleClickBtnSignUp());
								}}
							>
								Inscription
							</button>
							<button
								className="header__btn"
								type="button"
								onClick={() => {
									dispatch(handleClickBtnSignIn());
								}}
							>
								Connexion
							</button>
						</>
					) : (
						// Contenu à afficher si l'utilisateur est connecté
						<div className="header__pseudo-profile">
							<div className="container-coins">
								<img src="./img/coin.png" alt="" />
								<p> {coins}</p>
								<h2 className="header__pseudo">{username}</h2>
							</div>
							<Link to="/profil" className="link">
								<CgProfile className="header__icon" />
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
