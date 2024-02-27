import { configureStore } from '@reduxjs/toolkit';
// Import des reducers
import oSurvivorsSlice from './oSurvivorsSlice';
import userSlice from './userSlice';

// Import des middlewares
import authMiddleware from './middlewares/authMiddleware';
import authSignupMiddleware from './middlewares/authSignupMiddleware';
import userRecoveryMiddleware from './middlewares/userRecoveryMiddleware';
import modifyUserDataMiddleware from './middlewares/modifyUserDataMiddleware';
import modifyUserPasswordMiddlewares from './middlewares/modifyUserPasswordMiddleware';
import getDataMiddleware from './middlewares/getDataMiddleware';
import forgotPasswordMiddleware from './middlewares/forgotPasswordMiddleware';
import resetPasswordMiddleware from './middlewares/resetPasswordMiddleware';
import contactMiddleware from './middlewares/ContactMiddleware';

// Création du store
const store = configureStore({
	// Ajout des reducers
	reducer: {
		oSurvivors: oSurvivorsSlice,
		user: userSlice,
	},
	// Ajout des middlewares
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authMiddleware,
			authSignupMiddleware,
			userRecoveryMiddleware,
			modifyUserDataMiddleware,
			getDataMiddleware,
			modifyUserPasswordMiddlewares,
			forgotPasswordMiddleware,
			resetPasswordMiddleware,
			contactMiddleware
		),
});

export default store;
