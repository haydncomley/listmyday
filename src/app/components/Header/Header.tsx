import React from 'react';
import styles from './Header.module.scss';

export interface IHeader {
}

// eslint-disable-next-line no-empty-pattern
const Header = ({ }: IHeader) => {
	return (
		<div className={styles.Header}>
			<span className={styles.HeaderInfo}>
				<h1>ListMy.Day</h1>
			</span>
		</div>
	);
};

export default Header;
