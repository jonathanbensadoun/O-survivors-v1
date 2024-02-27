import './ModalSucessSignUP.scss';
// import icon close
import { IoCloseSharp } from 'react-icons/io5';
// import hooks from react-redux
import { useDispatch, useSelector } from 'react-redux';
// import action from userSlice
import { closeModalSuccessSignUp } from '../../store/oSurvivorsSlice';

// Composant ModalSucessSignUP
export default function ModalSucessSignUP() {
	const dispatch = useDispatch();
	return (
		<div className="modalSucessSignUp__container">
			<h1>
				Votre inscription a bien été prise en compte. Veuillez vérifier votre
				boite mail pour validation.
			</h1>

			<IoCloseSharp
				onClick={() => {
					dispatch(closeModalSuccessSignUp()); // action pour fermer la modal
				}}
			/>
		</div>
	);
}
