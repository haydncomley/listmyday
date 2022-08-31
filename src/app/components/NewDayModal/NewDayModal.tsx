import React, { useState } from 'react';
import ContextButton from '../ContextButton/ContextButton';
import Modal from '../Modal/Modal';
import Textarea from 'react-expanding-textarea';

import styles from './NewDayModal.module.scss';

export interface INewDayModal {
	notes?: string,
	onChange?: (notes: string) => void
}

const NewDayModal = ({ notes, onChange }: React.PropsWithChildren<INewDayModal>) => {
	const [ showModal, setShowModal ] = useState(false);
	const [ text, setText ] = useState(notes || '');
	
	return (
		<>
			<ContextButton
				icon='notes'
				onPress={() => setShowModal(!showModal)}
				swapHorizontal/>
			<Modal
				header='Day Notes'
				onBackdrop={() => setShowModal(!showModal)}
				show={showModal}>
				<Textarea
					className={styles.Notes}
					onChange={(e) => {
						setText(e.target.value);
						if (onChange) onChange(e.target.value);
					}}
					placeholder='Notes...'
					value={text} />
			</Modal>
		</>
	);
};

export default NewDayModal;
