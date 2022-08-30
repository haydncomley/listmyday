import React, { } from 'react';
import styles from './Modal.module.scss';

export interface IModal {
	header?: string,
	show?: boolean,
}

// eslint-disable-next-line no-empty-pattern
const Modal = ({ children }: React.PropsWithChildren<IModal>) => {
	return (
		<div className={styles.ModalWrapper}>
			<div className={styles.Shade} />
			<div className={styles.Modal} >
				<div className={styles.ModalHeader}>
					<h4>Modal</h4>
				</div>
				<div className={styles.ModalBody}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
