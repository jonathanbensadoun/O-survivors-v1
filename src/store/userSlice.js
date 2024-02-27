import { createSlice } from '@reduxjs/toolkit';
// Initial state
export const initialState = {
	logged: false,
	username: '',
	password: '',
	email: '',
	token: '',
	coins: 0,
	id: '',
	role: '',
	message: '',
	newPassword: '',
	passwordConfirmation: '',
	userData: [
		{
			username: '',
			email: '',
		},
	],
	typingValuePseudo: '',
	typingValuePassword: '',
	typingValueNewPassword: '',
	typingValueNewPasswordConfirmation: '',
	typingValueEmail: '',
	typingValueMessage: '',
	error: '',
};
// creation d'un slice pour gérer les actions et reducers liés à l'utilisateur
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getCoins: (state, action) => {
			// On récupère les coins
			return {
				...state,
				coins: action.payload,
			};
		},
		handleSubmitformContact: (state) => {
			const { typingValueEmail, typingValueMessage } = state;
			// On récupère les données du formulaire
			return {
				...state,
				email: typingValueEmail,
				message: typingValueMessage,
			};
		},
		handletypingValueMessage: (state, action) => {
			// On récupère la valeur du message
			return {
				...state,
				typingValueMessage: action.payload,
			};
		},
		handleSubmitFormProfil: (state) => {
			// On récupère les données du formulaire
			const {
				typingValuePseudo,
				typingValueEmail,
				typingValuePassword,
				typingValueNewPassword,
				typingValueNewPasswordConfirmation,
			} = state;

			return {
				...state,
				username: typingValuePseudo,
				email: typingValueEmail,
				password: typingValuePassword,
				newPassword: typingValueNewPassword,
				passwordConfirmation: typingValueNewPasswordConfirmation,
			};
		},
		updateDataByUserRecovery: (state, action) => {
			return {
				...state,
				[action.payload.dataName]: action.payload.dataValue,
			};
		},

		reconnectUser: (state) => {
			// On récupère les données de l'utilisateur
			return {
				...state,
				username: localStorage.getItem('username'),
				logged: localStorage.getItem('logged'),
				token: localStorage.getItem('token'),
				coins: localStorage.getItem('coins'),
			};
		},
		handleClickdDisconnect: (state) => {
			// On remet à zéro les données de l'utilisateur
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			localStorage.removeItem('email');
			localStorage.setItem('logged', false);
			return {
				...state,
				logged: false,
				username: '',
				password: '',
				email: '',
				token: '',
				coins: '',
				id: '',
				role: '',
				newPassword: '',
				passwordConfirmation: '',
				userData: [
					{
						username: '',
						email: '',
					},
				],
				typingValuePseudo: '',
				typingValuePassword: '',
				typingValueNewPassword: '',
				typingValueNewPasswordConfirmation: '',
				typingValueEmail: '',
				error: '',
			};
		},
		clearLoginData: (state) => {
			// On remet à zéro les données de l'utilisateur pour vidée les champs de formulaire
			return {
				...state,
				typingValuePseudo: '',
				typingValuePassword: '',
				typingValueEmail: '',
				error: '',
			};
		},
		handleTypingValueEmail: (state, action) => {
			// On récupère la valeur de l'email
			return {
				...state,
				typingValueEmail: action.payload,
			};
		},
		handleTypingValuePassword: (state, action) => {
			// On récupère la valeur du mot de passe
			return {
				...state,
				typingValuePassword: action.payload,
			};
		},
		handleTypingValuePseudo: (state, action) => {
			// On récupère la valeur du pseudo
			return {
				...state,
				typingValuePseudo: action.payload,
			};
		},
		handleTypingValueNewPassword: (state, action) => {
			// On récupère la valeur du mot de passe
			return {
				...state,
				typingValueNewPassword: action.payload,
			};
		},
		handleTypingValueNewPasswordConfirmation: (state, action) => {
			// On récupère la valeur du mot de passe
			return {
				...state,
				typingValueNewPasswordConfirmation: action.payload,
			};
		},
		handleSuccessfulLogin: (state, action) => {
			// On récupère les données de l'utilisateur
			return {
				...state,
				logged: action.payload,
			};
		},
		handleSubmitFormSignIn: (state) => {
			const { typingValuePseudo, typingValuePassword } = state;
			// On récupère les données du formulaire
			return {
				...state,
				username: typingValuePseudo,
				password: typingValuePassword,
			};
		},
		handleSubmitFormSignUp: (state) => {
			const { typingValuePseudo, typingValuePassword, typingValueEmail } =
				state;
			// On récupère les données du formulaire
			return {
				...state,
				username: typingValuePseudo,
				password: typingValuePassword,
				email: typingValueEmail,
			};
		},
		changeStatusLogged: (state, action) => {
			// On change le statut de connexion
			return {
				...state,
				logged: action.payload,
			};
		},
		getError: (state, action) => {
			// On récupère l'erreur
			return {
				...state,
				error: action.payload,
			};
		},
		getToken: (state, action) => {
			// On récupère le token
			return {
				...state,
				token: action.payload,
			};
		},
	},
});

// J'exporte les actions creators qui correspondent à mes reducers
export const {
	handleSuccessfulLogin,
	handleTypingValuePseudo,
	handleTypingValuePassword,
	handleTypingValueNewPassword,
	handleTypingValueNewPasswordConfirmation,
	handletypingValueMessage,
	handleTypingValueEmail,
	handleSubmitFormSignIn,
	handleSubmitFormSignUp,
	handleSubmitformContact,
	changeStatusLogged,
	clearLoginData,
	handleClickdDisconnect,
	reconnectUser,
	getError,
	updateDataByUserRecovery,
	handleSubmitFormProfil,
	getToken,
	getCoins,
} = userSlice.actions;

export default userSlice.reducer;
