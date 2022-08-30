import { classlist } from 'easy-class';
import React, { } from 'react';
import styles from './Modal.module.scss';

export interface IModal {
	header?: string,
	show?: boolean,
	onBackdrop?: () => void
}

// eslint-disable-next-line no-empty-pattern
const Modal = ({ children, show, header, onBackdrop }: React.PropsWithChildren<IModal>) => {
	return (
		<div className={classlist(
			styles.ModalWrapper,
			show && styles.ModalWrapperShow
		)}>
			<div
				className={styles.Shade}
				onClick={onBackdrop} />
			<div className={styles.Modal} >
				<div className={styles.ModalHeader}>
					{ header && <h4>{header}</h4>}
				</div>
				<div className={styles.ModalBody}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
