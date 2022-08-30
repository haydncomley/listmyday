import { classlist } from 'easy-class';
import React from 'react';
import styles from './ContextButton.module.scss';

export interface IContextButton {
	icon: string,
	disabled?: boolean,
	onPress: () => void
}

const ContextButton = ({ icon, disabled, onPress }: React.PropsWithChildren<IContextButton>) => {
	return (
		<button
			className={classlist(
				styles.ContextButton,
				disabled && styles.ContextButtonDisabled
			)}
			onClick={() => {
				if (!disabled && onPress) onPress();
			}}>
			<span className="material-icons-round">{icon}</span> 
		</button>
	);
};

export default ContextButton;
