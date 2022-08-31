import { classlist } from 'easy-class';
import React from 'react';
import styles from './ContextButton.module.scss';

export interface IContextButton {
	icon: string,
	disabled?: boolean,
	onPress: () => void,
	swapHorizontal?: boolean
}

const ContextButton = ({ icon, disabled, swapHorizontal, onPress }: React.PropsWithChildren<IContextButton>) => {
	return (
		<button
			className={classlist(
				styles.ContextButton,
				disabled && styles.ContextButtonDisabled,
				swapHorizontal && styles.ContextButtonSwapH
			)}
			onClick={() => {
				if (!disabled && onPress) onPress();
			}}>
			<span className="material-icons-round">{icon}</span> 
		</button>
	);
};

export default ContextButton;
