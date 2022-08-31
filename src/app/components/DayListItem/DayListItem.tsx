import React, { useCallback, useEffect, useState } from 'react';
import { IDayEvent } from '../../definitions/IDay';
import Chip from '../Chip/Chip';
import TimePicker from '../TimePicker/TimePicker';
import styles from './DayListItem.module.scss';
import Textarea from 'react-expanding-textarea';

export interface IDayListItem {
	details: IDayEvent,
	onChange?: (event: IDayEvent) => void,
	onDelete?: () => void,
	onMoveUp?: () => void,
	onMoveDown?: () => void,
}

const DayListItem = ({ details, onChange, onDelete, onMoveUp, onMoveDown }: React.PropsWithChildren<IDayListItem>) => {
	const [ init, setInit ] = useState(false);
	const [ start, setStart ] = useState(details.start);
	const [ end, setEnd ] = useState(details.end);
	const [ message, setMessage ] = useState(details.message);
	const [ people, setPeople ] = useState([...details.people]);
	
	useEffect(() => {
		if (!init) {
			setInit(true);
			return;
		}
		if (!onChange) return;

		const event = { ...details };
		event.start = start;
		event.end = end;
		event.message = message;
		event.people = [...people];

		onChange(event);
	}, [start, end, message, JSON.stringify(people)]);

	const renderPeople = useCallback(() => {
		return people.map((x, i) => <Chip
			key={i + x}
			onChange={(v) => {
				if (!v) {
					const peeps = [...people];
					peeps.splice(i, 1);
					setPeople(peeps);
					return;
				}

				const peeps = [...people];
				peeps[i] = v;
				setPeople(peeps);
			}}
			onDelete={() => {
				const peeps = [...people];
				peeps.splice(i, 1);
				setPeople(peeps);
			}}
			value={x} />);
	}, [people.length]);
	
	return (
		<div className={styles.DayListItem}>
			<div
				className={styles.Timings}
				onKeyDown={(x) => {
					if (!!onDelete && !start && x.key === 'Backspace') {
						onDelete();
					}
				}}>
				<TimePicker
					onChange={(time) => setStart(time)}
					value={start} />
				<span className="material-icons-round">east</span> 
				<TimePicker
					onChange={(time) => setEnd(time)}
					value={end} />
			</div>
			<Textarea
				className={styles.Notes}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Notes...'
				rows={1}
				value={message}  />
			<span className={styles.People}>
				{ renderPeople() }
				<button
					className={styles.AddPerson}
					onClick={() => {
						setPeople((prev) => [...prev, 'Tag ' + (prev.length + 1)]);
					}}>
					<span className="material-icons-round">add</span> 
				</button>
			</span>

			<span className={styles.Actions}>
				{!!onMoveUp && <button onClick={onMoveUp}>
					<span className="material-icons-round">arrow_upward</span> 
				</button>}
				{!!onMoveDown && <button onClick={onMoveDown}>
					<span className="material-icons-round">arrow_downward</span> 
				</button>}
				{!!onDelete && <button onClick={onDelete}>
					<span className="material-icons-round">close</span> 
				</button>}
			</span>
		</div>
	);
};

export default DayListItem;
