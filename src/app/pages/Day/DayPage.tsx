import { classlist } from 'easy-class';
import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContextButton from '../../components/ContextButton/ContextButton';
import DayListItem from '../../components/DayListItem/DayListItem';
import Header from '../../components/Header/Header';
import NewDayModal from '../../components/NewDayModal/NewDayModal';
import { Day } from '../../definitions/Day';
import styles from './DayPage.module.scss';

export interface IDayPage {
}

// eslint-disable-next-line no-empty-pattern
const DayPage = ({ }: IDayPage) => {
	const navigation = useNavigate();
	const params = useParams();
	const date = params?.date || DateTime.now().toFormat('yyyy-MM-dd');
	const [day, setDay] = useState<Day>();
	const [count, setCount ] = useState(0);

	const [ last, setLast ] = useState('');
	const [ hasChanges, setHasChanges ] = useState(false);

	useEffect(() => {
		if (!day) return;
		const current = day.export();
		
		const changed = last.localeCompare(current) != 0;
		if (changed && last !== '' && !hasChanges) {
			console.log('Updates Made.');
			setHasChanges(true);
		}
		setLast(current);
	}, [count]);

	const saveCurrent = () => {
		if (day) {
			localStorage.setItem(`listmy.day-${date}`, day.export());
			console.log(day.export());
			setHasChanges(false);
			setCount((prev) => prev + 1);
		}
	};

	const onKeydown = (x: KeyboardEvent) => {
		if (x.key === 's' && x.ctrlKey) {
			x.preventDefault();
			x.stopPropagation();
			document.querySelector<HTMLButtonElement>('#save-button')!.click();
		}

		if (x.key === 'i' && x.ctrlKey) {
			x.preventDefault();
			x.stopPropagation();
			
			const i = document.createElement('input');
			i.multiple = false;
			i.accept = 'text/plain';
			i.type = 'file';

			i.addEventListener('change', () => {
				if (i.files?.length === 1) {
					const reader = new FileReader();
					reader.addEventListener('load', () => {
						localStorage.setItem(`listmy.day-${date}`, reader.result as string);
						navigation('/');
						location.reload();
					});
					reader.readAsText(i.files[0]);
				}
			});

			i.click();
		}

		if (x.key === 'd' && x.ctrlKey) {
			x.preventDefault();
			x.stopPropagation();
			document.querySelector<HTMLButtonElement>('#save-button')!.click();

			setTimeout(() => {
				const blob = new Blob([localStorage.getItem(`listmy.day-${date}`) || ''], {
					type: 'text/plain;charset=utf-8'
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${date}_TimeSheet.txt`;
				a.click();
	
				setTimeout(() => {
					URL.revokeObjectURL(url);
					a.remove();
				}, 0);
			}, 50);
		}
	};

	useEffect(() => {
		const day = new Day().import(
			localStorage.getItem(`listmy.day-${date}`) || ''
		);

		if (!day?.getDate().invalidReason) {
			setDay(day!);
			setCount((prev) => prev + 1);
		} else {
			const day = new Day().import(DateTime.now().toFormat(`dd'${new Day().ordinal(DateTime.now().day)} of' MMMM yyyy\n\n`));
			setDay(day!);
			setCount((prev) => prev + 1);
		}

		window.addEventListener('keydown', onKeydown);

		return () => {
			window.removeEventListener('keydown', onKeydown);
		};
	}, []);

	const renderList = useCallback(() => {
		return day?.getEvents().map((x, i) => <DayListItem
			details={x}
			key={x.start}
			onChange={(e) => {
				if (!day) return;
				const events = [...day.getEvents()];
				events[i] = e;
				day.setEvents([...events]);
				setDay(day);
				setCount((prev) => prev + 1);
			}}
			onDelete={() => {
				if (!day) return;
				const events = [...day.getEvents()];
				events.splice(i, 1);
				day.setEvents([...events]);
				setDay(day);
				setCount((prev) => prev + 1);
			}}
			onMoveDown={i === day.getEvents().length - 1 ? undefined : () => {
				if (!day) return;
				const events = [...day.getEvents()];
				const event = events.splice(i, 1)[0];
				events.splice(i + 1, 0, event);
				day.setEvents([...events]);
				setDay(day);
				setCount((prev) => prev + 1);
			}}
			onMoveUp={i === 0 ? undefined : () => {
				if (!day) return;
				const events = [...day.getEvents()];
				const event = events.splice(i, 1)[0];
				events.splice(i - 1, 0, event);
				day.setEvents([...events]);
				setDay(day);
				setCount((prev) => prev + 1);
			}} />);
	}, [count]);

	return (
		<div className={styles.DayPage}>
			<Header />
			<div className={styles.DayPageList}>
				{ renderList() }
			</div>
			<button
				className={classlist(
					styles.Save,
					!hasChanges && styles.HideSave
				)}
				id='save-button'
				onClick={() => {
					saveCurrent();
				}}>
				<span className="material-icons-round">save</span> 
					Save
			</button>
			
			<ContextButton
				icon='add'
				onPress={() => {
					if (!day) {
						return;
					}
					
					const events = [...day.getEvents()];
					if (events.length > 0) {
						events.push({
							duration_seconds: DateTime.now().diff(events.slice(-1)[0].end_timestamp, 'seconds').seconds,
							end: DateTime.now().toFormat('HH:mm'),
							end_timestamp: DateTime.now(),
							message: '',
							people: [],
							start: events.slice(-1)[0].end,
							start_timestamp: events.slice(-1)[0].end_timestamp,
						});
					} else {
						events.push({
							duration_seconds: DateTime.now().diff(DateTime.now().set({ hour: 9, minute: 0 }), 'seconds').seconds,
							end: DateTime.now().toFormat('HH:mm'),
							end_timestamp: DateTime.now(),
							message: '',
							people: [],
							start: DateTime.now().set({ hour: 9, minute: 0 }).toFormat('HH:mm'),
							start_timestamp: DateTime.now().set({ hour: 9, minute: 0 }),
						});
					}

					day.setEvents(events);

					setDay(day);
					setCount((prev) => prev + 1);
				}}/>
			{day && <NewDayModal
				notes={day?.getNotes()}
				onChange={(s) => {
					day?.setNotes(s);
					setCount((prev) => prev + 1);
				}} />}
		</div>
	);
};

export default DayPage;
