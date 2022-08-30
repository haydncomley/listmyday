import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { Day } from '../../definitions/Day';
import styles from './DayPage.module.scss';

export interface IDayPage {
}

// eslint-disable-next-line no-empty-pattern
const DayPage = ({ }: IDayPage) => {

	useEffect(() => {
		const today = new Day().load('/data/test-day.data.txt').then((x) => {
			console.log(x?.getNextAvailableEvent());
		});
	}, []);

	return (
		<div className={styles.DayPage}>
			<Header />

			<Modal />
		</div>
	);
};

export default DayPage;
