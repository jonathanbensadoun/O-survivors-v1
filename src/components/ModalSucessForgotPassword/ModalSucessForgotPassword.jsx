import './ModalSucessForgotPassword.scss';
// import icon close
import { IoCloseSharp } from 'react-icons/io5';
// import hooks from react-redux
import { useDispatch } from 'react-redux';
// import action from userSlice
import { closeModalSuccessforgotPassword } from '../../store/oSurvivorsSlice';

export default function ModalSucessForgotPassword() {
	const dispatch = useDispatch();
	return (
		<div className="modalSucessSignUp__container">
			<h1>
				Message votre demande de mot de passe a bien été pris en compte.
				Veuillez vérifier votre boite mail pour changer votre mot de passe
			</h1>

			<IoCloseSharp
				onClick={() => {
					dispatch(closeModalSuccessforgotPassword()); // action pour fermer la modal
				}}
			/>
		</div>
	);
}
