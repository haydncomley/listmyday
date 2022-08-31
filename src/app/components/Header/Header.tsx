import { DateTime } from 'luxon';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Header.module.scss';

export interface IHeader {
}

// eslint-disable-next-line no-empty-pattern
const Header = ({ }: IHeader) => {
	const params = useParams();
	const date = DateTime.fromFormat(params?.date || DateTime.now().toFormat('yyyy-MM-dd'), 'yyyy-MM-dd');
	const displayDate = Math.floor(DateTime.now().diff(date, 'days').days) === 0 ? 'Today' : date.toFormat('MMMM dd - yyyy');

	return (
		<div className={styles.Header}>
			<span className={styles.HeaderInfo}>
				<h1>ListMy.Day</h1>
			</span>

			<span className={styles.Date}>
				<span className="material-icons">today</span> 
				{displayDate}
			</span>
		</div>
	);
};

export default Header;
