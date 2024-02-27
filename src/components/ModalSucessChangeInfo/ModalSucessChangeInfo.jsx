import './ModalSucessChangeInfo.scss';
// import icon close
import { IoCloseSharp } from 'react-icons/io5';
// import hooks from react-redux
import { useDispatch } from 'react-redux';
// import action from userSlice
import { closeModalSuccessChangeInfo } from '../../store/oSurvivorsSlice';

export default function ModalSucessChangeInfo() {
	const dispatch = useDispatch();
	return (
		<div className="modalSucessSignUp__container">
			<h1>Vos informations ont été mis à jours </h1>

			<IoCloseSharp
				onClick={() => {
					dispatch(closeModalSuccessChangeInfo()); // On déclenche l'action 'closeModalSuccessChangeInfo' pour fermer la modal
				}}
			/>
		</div>
	);
}
