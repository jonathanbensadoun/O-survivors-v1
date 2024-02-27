// Importation des styles de MenuBurger
import './MenuBurger.scss';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

// Importation Hook de react-redux
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
// Importation de l'action du store
import {
	handleClickMenuBurger,
	toggleDropdown,
} from '../../store/oSurvivorsSlice';
import { handleClickdDisconnect } from '../../store/userSlice';

// Composant MenuBurger
export default function MenuBurger() {
	const dispatch = useDispatch();

	const logged = useSelector((state) => state.user.logged);
	const isDropdownOpen = useSelector(
		(state) => state.oSurvivors.isDropdownOpen
	);

	const handleDropdownClick = () => {
		dispatch(toggleDropdown());
	};

	return (
		<div className="menu">
			<div className="menu__sign">
				{/*  Si l'utilisateur est connecté on affiche les boutons de profil et de déconnexion sinon on affiche les boutons de connexion et d'inscription */}
				{logged ? (
					<>
						<button
							className="menu__sign-btn"
							type="button"
							onClick={() => {
								dispatch(handleClickMenuBurger());
							}}
						>
							<Link to="/profil">Profil</Link>
						</button>

						<button
							className="menu__sign-btn"
							type="button"
							onClick={() => {
								dispatch(handleClickdDisconnect());
							}}
						>
							Deconnexion
						</button>
					</>
				) : (
					<>
						<Link to="/signup">
							<button
								className="menu__sign-btn"
								type="button"
								onClick={() => {
									dispatch(handleClickMenuBurger());
								}}
							>
								Inscription
							</button>
						</Link>
						<Link to="/signin">
							<button
								className="menu__sign-btn"
								type="button"
								onClick={() => {
									dispatch(handleClickMenuBurger());
								}}
							>
								Connexion
							</button>
						</Link>
					</>
				)}
			</div>
			{/* Liste des liens de navigation */}
			<ul className="menu__list">
				<li>
					<Link
						to="/"
						onClick={() => {
							dispatch(handleClickMenuBurger());
						}}
					>
						Accueil
					</Link>
				</li>
				<li className="menu__dropdown" onClick={handleDropdownClick}>
					<div className="discover">
						Découvrir
						<div>
							{isDropdownOpen ? <GoTriangleUp /> : <GoTriangleDown />}
						</div>{' '}
						{/*  On affiche la flèche vers le haut ou le bas en fonction de l'état du dropdown */}
					</div>

					{isDropdownOpen && (
						<div className={`menu__dropdown-content `}>
							<ul>
								<li>
									<Link
										to="/guide"
										onClick={() => {
											dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
										}}
									>
										Guide
									</Link>
								</li>
								<li>
									<Link
										to="/personnages"
										onClick={() => {
											dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
										}}
									>
										Personnages
									</Link>
								</li>
								<li>
									<Link
										to="/bestiaire"
										onClick={() => {
											dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
										}}
									>
										Bestiaire
									</Link>
								</li>
								<li>
									<Link
										to="/armes"
										onClick={() => {
											dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
										}}
									>
										Armes
									</Link>
								</li>
								<li>
									<Link
										to="/items"
										onClick={() => {
											dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
										}}
									>
										Items
									</Link>
								</li>
							</ul>
						</div>
					)}
				</li>
				<li>
					<Link
						to="/lore"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						Lore
					</Link>
				</li>
				<li>
					<Link
						to="/a-propos"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						À propos
					</Link>
				</li>
				<li>
					<Link
						to="contact"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						Contact
					</Link>
				</li>
				<li>
					<Link
						to="/mentions-legales"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						mentions légales
					</Link>
				</li>
				<li>
					<Link
						to="/politique-de-confidentialitée"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						Politique de confidentialitée
					</Link>
				</li>
				<li>
					<Link
						to="/credits"
						onClick={() => {
							dispatch(handleClickMenuBurger()); // On déclenche l'action 'handleClickMenuBurger' pour fermer le menu burger
						}}
					>
						Crédits
					</Link>
				</li>
			</ul>
		</div>
	);
}
