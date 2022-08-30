import { classlist } from 'easy-class';
import React, { useCallback, useEffect, useState } from 'react';
import { IDayEvent } from '../../definitions/IDay';
import Chip from '../Chip/Chip';
import TimePicker from '../TimePicker/TimePicker';
import styles from './DayListItem.module.scss';

export interface IDayListItem {
	details: IDayEvent,
	onChange?: (event: IDayEvent) => void
}

const DayListItem = ({ details, onChange }: React.PropsWithChildren<IDayListItem>) => {
	const [ start, setStart ] = useState(details.start);
	const [ end, setEnd ] = useState(details.end);
	const [ message, setMessage ] = useState(details.message);
	const [ people, setPeople ] = useState([...details.people]);
	
	useEffect(() => {
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
			<div className={styles.Timings}>
				<TimePicker
					onChange={(time) => setStart(time)}
					value={start} />
				<span className="material-icons-round">east</span> 
				<TimePicker
					onChange={(time) => setEnd(time)}
					value={end} />
			</div>
			<textarea
				className={classlist(
					styles.Notes,
					people.length > 0 && styles.NotesWithPeople
				)}
				onChange={(e) => setMessage(e.target.value)}
				value={message}  />
			<span className={styles.People}>
				{ renderPeople() }
				<button
					className={styles.AddPerson}
					onClick={() => {
						setPeople((prev) => [...prev, 'Person ' + prev.length]);
					}}>
					<span className="material-icons-round">add</span> 
				</button>
			</span>
		</div>
	);
};

export default DayListItem;
