import React, { useCallback, useEffect, useState } from 'react';
import DayListItem from '../../components/DayListItem/DayListItem';
import Header from '../../components/Header/Header';
import NewDayModal from '../../components/NewDayModal/NewDayModal';
import { Day } from '../../definitions/Day';
import styles from './DayPage.module.scss';

export interface IDayPage {
}

// eslint-disable-next-line no-empty-pattern
const DayPage = ({ }: IDayPage) => {
	const [ day, setDay ] = useState<Day>();

	useEffect(() => {
		const today = new Day().load('/data/test-day.data.txt').then((x) => {
			setDay(x!);
		});
	}, []);

	const renderList = useCallback(() => {
		return day?.getEvents().map((x, i) => <DayListItem
			details={x}
			key={i}
			onChange={(e) => {
				setDay((prev) => {
					const events = prev?.getEvents() || [];
					events[i] = e;
					return prev?.setEvents(events);
				});
			}} />);
	}, [day?.getEvents().length]);

	return (
		<div className={styles.DayPage}>
			<Header />
			<div className={styles.DayPageList}>
				{ renderList() }
			</div>
			<button onClick={() => alert(day?.export())}>Done</button>
			
			<NewDayModal />
		</div>
	);
};

export default DayPage;
