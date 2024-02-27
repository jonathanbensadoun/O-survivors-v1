import './Contact.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showMessageOk } from '../../store/oSurvivorsSlice';
import {
	handleTypingValueEmail,
	handletypingValueMessage,
	handleSubmitformContact,
} from '../../store/userSlice';

export default function Contact() {
	const dispatch = useDispatch();
	const typingValueEmail = useSelector((state) => state.user.typingValueEmail);
	const typingValueMessage = useSelector(
		(state) => state.user.typingValueMessage
	);
	useEffect(() => {
		dispatch(showMessageOk(false));
	}, []);
	const isMessageOk = useSelector((state) => state.oSurvivors.isMessageOk);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleSubmitformContact());
		dispatch({ type: 'SUBMIT_CONTACT' });
	};
	return (
		<div className="contact">
			<div className="contact__container-img">
				<img
					className="contact__img"
					src="/img/contact.jpeg"
					alt="image d'un sorcier qui envoit un mail"
				/>
			</div>
			{!isMessageOk ? (
				<form className="contact__form" action="" onSubmit={handleSubmit}>
					<h1 className="contact__title">Contact</h1>
					<p className="contact__subtitle">Laissez nous un petit message</p>
					<div className="contact__container-description">
						<label className="contact__label" htmlFor="email">
							Email
						</label>
						<input
							value={typingValueEmail}
							className="contact__input"
							id="email"
							type="text"
							placeholder="Entrez votre adresse email"
							onChange={(e) => {
								dispatch(handleTypingValueEmail(e.target.value)); // On déclenche l'action 'handleTypingValueEmail' pour récupérer la valeur de l'input
							}}
						/>
						<label className="contact__label" htmlFor="message">
							Message
						</label>
						<textarea
							value={typingValueMessage}
							className="contact__textarea"
							name="message"
							id="message"
							placeholder="Ecrivez votre message..."
							autoFocus="none"
							onChange={(e) => {
								dispatch(handletypingValueMessage(e.target.value)); // On déclenche l'action 'handletypingValueMessage' pour récupérer la valeur de l'input
							}}
						></textarea>
					</div>
					<button className="contact__submit" type="submit">
						soumettre
					</button>
				</form>
			) : (
				<p className="contact__messageOk">Votre message a bien été envoyé</p>
			)}
		</div>
	);
}
