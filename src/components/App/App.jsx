// Importation des styles de l'application
import './App.scss';

// Importation des hooks de React
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importation des actions Redux
import { reconnectUser } from '../../store/userSlice';
import { closeAllModalSucess } from '../../store/oSurvivorsSlice';

// Importation des composants de l'application
import GameContainer from '../GameContainer/GameContainer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MenuBurger from '../MenuBurger/MenuBurger';
import MainMobile from '../MainMobile/MainMobile';
import Profil from '../Profil/Profil';
import ModalSignUp from '../ModalSignUp/ModalSignUp';
import ModalSignIn from '../ModalSignIn/ModalSignIn';
import MobileSignIn from '../MobileSignIn/MobileSignIn';
import MobileSignUp from '../MobileSignUp/MobileSignUp';
import Legal from '../Legal/Legal';
import Contact from '../Contact/Contact';
import LandingPage from '../LandingPage/LandingPage';
import UnderConstruction from '../UnderConstruction/UnderConstruction';
import Error404 from '../Error404/Error404';
import Bestiary from '../Bestiary/Bestiary';
import Characters from '../Characters/Characters';
import Credits from '../Credits/Credits';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import ModalSucessSignUP from '../ModalSucessSignUP/ModalSucessSignUP';
import ModalSucessChangeInfo from '../ModalSucessChangeInfo/ModalSucessChangeInfo';
import ChangePassword from '../ChangePassword/ChangePassword';
import EmailPasswordForgot from '../EmailPasswordForgot/EmailPasswordForgot';
import ModalSucessForgotPassword from '../ModalSucessForgotPassword/ModalSucessForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
import About from '../About/About.jsx';

function App() {
	const dispatch = useDispatch();
	// Utilisation du Hook useSelector de Redux pour obtenir des informations disponible dans le state du store
	const showMenu = useSelector((state) => state.oSurvivors.showMenu);
	const showModalSignUp = useSelector(
		(state) => state.oSurvivors.showModalSignUp
	);
	const showModalSignIn = useSelector(
		(state) => state.oSurvivors.showModalSignIn
	);
	const isSuccessSignUp = useSelector(
		(state) => state.oSurvivors.isSuccessSignUp
	);
	const isSucessChangeInfo = useSelector(
		(state) => state.oSurvivors.isSucessChangeInfo
	);
	const logged = useSelector((state) => state.user.logged);
	const isSucessAskForgotPassword = useSelector(
		(state) => state.oSurvivors.isSucessAskForgotPassword
	);
	const isMessageOk = useSelector((state) => state.oSurvivors.isMessageOk);
	const coins = useSelector((state) => state.user.coins);

	// Détection de la taille de l'écran pour adapter l'affichage
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1024px)',
	});
	useEffect(() => {
		const isToken = localStorage.getItem('token');
		if (isToken) {
			dispatch(reconnectUser());
		}
	}, [coins]);
	// Utilisation du Hook useEffect de React pour effectuer des actions au chargement du composant
	// Ferme les modales de succès après 10 secondes
	useEffect(() => {
		setTimeout(() => {
			dispatch(closeAllModalSucess());
		}, 10000);
	}, [
		isSuccessSignUp,
		isSucessChangeInfo,
		isSucessAskForgotPassword,
		isMessageOk,
	]);

	return (
		<>
			{/* Affichage du HeaderMobile avec les props nécessaires  */}
			<Header isDesktopOrLaptop={isDesktopOrLaptop} showMenu={showMenu} />
			{/* Affichage du Menu si showMenu est vrai */}
			{showMenu && <MenuBurger />}
			{/* Affichage du ModalSignUp si showModalSignUp est vrai */}
			{showModalSignUp && <ModalSignUp />}
			{/* Affichage du ModalSignIn si showModalSignIn est vrai */}
			{showModalSignIn && <ModalSignIn />}
			{/* Affichage du ModalSucessSignUP si isSuccessSignUp est vrai */}
			{isSuccessSignUp && <ModalSucessSignUP />}
			{/* Affichage du ModalSucessSignUP si isSuccessSignUp est vrai */}
			{isSucessChangeInfo && <ModalSucessChangeInfo />}
			{/* Affichage du ModalSucessForgotPassword si isSucessAskForgotPassword est vrai */}
			{isSucessAskForgotPassword && <ModalSucessForgotPassword />}

			{/* Affichage des routes de l'application */}
			<Routes>
				{/* Ajoutez une route pour la landing page */}
				<Route
					path="/"
					element={
						!isDesktopOrLaptop
							? !showMenu && <MainMobile />
							: !showMenu && <LandingPage />
					}
				/>
				<Route
					path="/jeu"
					element={
						!isDesktopOrLaptop
							? !showMenu && <MainMobile />
							: !showMenu && <GameContainer />
					}
				/>
				{/* Affichage du composant Profil sur la route /profil */}
				<Route
					path="/profil"
					element={
						logged && !isSucessChangeInfo ? <Profil /> : <Navigate to="/" />
					}
				/>
				<Route
					path="/changer_mot_de_passe"
					element={
						logged && !isSucessChangeInfo ? (
							<ChangePassword />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				{/* Affichage du composant MobilSugnIn si l'affichage est au format mobile sinon le composant GameContainer */}
				<Route
					path="/signin"
					element={
						isDesktopOrLaptop || logged ? <Navigate to="/" /> : <MobileSignIn />
					}
				/>
				{/* Affichage du composant MobilSugnUp si l'affichage est au format mobile sinon le composant GameContainer */}
				<Route
					path="/signup"
					element={!isSuccessSignUp ? <MobileSignUp /> : <Navigate to="/" />}
				/>
				<Route path="/mot-de-passe-oublié" element={<EmailPasswordForgot />} />
				<Route path="/changer-mot-de-passe" element={<ResetPassword />} />

				<Route path="/contact" element={<Contact />} />
				<Route path="/mentions-legales" element={<Legal />} />
				<Route
					path="/politique-de-confidentialitée"
					element={<PrivacyPolicy />}
				/>
				<Route path="/credits" element={<Credits />} />
				<Route path="/bestiaire" element={<Bestiary />} />
				<Route path="/guide" element={<UnderConstruction />} />
				<Route path="/personnages" element={<Characters />} />
				<Route path="/armes" element={<UnderConstruction />} />
				<Route path="/items" element={<UnderConstruction />} />
				<Route path="/lore" element={<UnderConstruction />} />
				<Route path="/a-propos" element={<About />} />
				{/* Affichage du composant Error404 si l'itinéraire n'est pas trouvé */}
				<Route path="/*" element={<Error404 />} />
			</Routes>

			{/* Affichage  du Footer si l'appareil est un ordinateur de bureau ou un ordinateur portable   */}
			{isDesktopOrLaptop && <Footer />}
		</>
	);
}

// Exportation du composant App par défaut
export default App;
