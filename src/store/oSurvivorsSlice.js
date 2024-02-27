import { createSlice } from '@reduxjs/toolkit';
// Initial state
const initialState = {
	showMenu: false,
	showModalSignUp: false,
	showModalSignIn: false,
	isDropdownOpen: false,
	pseudo: 'Pseudo',
	isConnected: false,
	isSuccessSignUp: false,
	isSucessChangeInfo: false,
	isSucessAskForgotPassword: false,
	endPointName: '',
	apiData: [],
	isMessageOk: false,
};
// creation de la slice
const oSurvivorsSlice = createSlice({
	name: 'oSurvivors',
	initialState,
	reducers: {
		toggleDropdown: (state) => {
			// On affiche ou masque le menu déroulant
			return {
				...state,
				isDropdownOpen: !state.isDropdownOpen,
			};
		},
		closeAllModalSucess: (state) => {
			// On ferme tous les modales
			return {
				...state,
				isSuccessSignUp: false,
				isSucessChangeInfo: false,
				isSucessAskForgotPassword: false,
				isMessageOk: false,
			};
		},
		showMessageOk: (state, action) => {
			// On affiche le message de succès
			return {
				...state,
				isMessageOk: action.payload,
			};
		},
		showModalSucessforgotPassword: (state) => {
			// On ouvre le modal de succès de la demande de mot de passe oublié
			return {
				...state,
				isSucessAskForgotPassword: true,
			};
		},
		closeModalSuccessforgotPassword: (state) => {
			// On ferme le modal de succès de la demande de mot de passe oublié
			return {
				...state,
				isSucessAskForgotPassword: false,
			};
		},
		// Enregistre les données de l'API dans le state
		saveApiData: (state, action) => {
			return {
				...state,
				apiData: action.payload,
			};
		},
		// Fonction qui change le nom de l'endPoint
		changeEndPointName: (state, action) => {
			return {
				...state,
				endPointName: action.payload,
			};
		},
		closeModalSuccessChangeInfo: (state) => {
			// On ferme tous les modales
			return {
				...state,
				isSucessChangeInfo: false,
			};
		},
		showModalSucessChangeInfo: (state) => {
			// On ferme tous les modales
			return {
				...state,
				showModalSignUp: false,
				showModalSignIn: false,
				isSucessChangeInfo: true,
			};
		},
		closeModalSuccessSignUp: (state) => {
			// On ferme tous les modales
			return {
				...state,
				isSuccessSignUp: false,
			};
		},
		showModalSuccessSignUp: (state) => {
			// On ferme tous les modales
			return {
				...state,
				showModalSignUp: false,
				showModalSignIn: false,
				isSuccessSignUp: true,
			};
		},
		signInSuccesFull: (state) => {
			// On ferme tous les modales
			return {
				...state,
				showModalSignUp: false,
				showModalSignIn: false,
			};
		},
		handleClickLogo: (state) => {
			// On ferme tous le menu
			return {
				...state,
				showMenu: false,
			};
		},
		handleClickMenuBurger: (state) => {
			// On affiche ou masque le menu
			return {
				...state,
				showMenu: !state.showMenu,
			};
		},
		handleClickBtnSignUp: (state) => {
			// On affiche ou masque le formulaire d'inscription
			return {
				...state,
				showModalSignUp: !state.showModalSignUp,
				showModalSignIn: false,
			};
		},
		handleClickBtnSignIn: (state) => {
			// On affiche ou masque le formulaire de connexion
			return {
				...state,
				showModalSignIn: !state.showModalSignIn,
				showModalSignUp: false,
			};
		},
	},
});

export const {
	handleClickMenuBurger,
	handleClickBtnSignUp,
	handleClickBtnSignIn,
	handleClickLogo,
	signInSuccesFull,
	showModalSuccessSignUp,
	changeEndPointName,
	saveApiData,
	closeModalSuccessSignUp,
	closeModalSuccessChangeInfo,
	closeModalSuccessforgotPassword,
	showModalSucessChangeInfo,
	toggleDropdown,
	showModalSucessforgotPassword,
	showMessageOk,
	closeAllModalSucess,
} = oSurvivorsSlice.actions;

export default oSurvivorsSlice.reducer;
