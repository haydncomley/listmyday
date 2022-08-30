import React from 'react';
import styles from './Chip.module.scss';

export interface IChip {
	value: string,
	onDelete?: () => void,
	onChange?: (value: string) => void
}

const Chip = ({ value, onDelete, onChange }: React.PropsWithChildren<IChip>) => {
	return (
		<div className={styles.Chip}>
			<span
				className={styles.ChipEdit}
				contentEditable={!!onChange}
				onInput={(e) => {
					if (onChange) onChange((e.target as any).innerText);
				}}
				suppressContentEditableWarning>
				{value}
			</span>

			{ onDelete && <button onClick={onDelete}>
				<span className="material-icons-round">close</span> 
			</button> }
		</div>
	);
};

export default Chip;
