import React, { useState } from 'react';
import ContextButton from '../ContextButton/ContextButton';
import Modal from '../Modal/Modal';

export interface INewDayModal {
}

// eslint-disable-next-line no-empty-pattern
const NewDayModal = ({ }: React.PropsWithChildren<INewDayModal>) => {
	const [ showModal, setShowModal ] = useState(false);
	
	return (
		<>
			<ContextButton
				icon='add'
				onPress={() => setShowModal(!showModal)}/>
			<Modal
				header='New Item'
				onBackdrop={() => setShowModal(!showModal)}
				show={showModal}>
				NewDayModal Works
			</Modal>
		</>
	);
};

export default NewDayModal;
