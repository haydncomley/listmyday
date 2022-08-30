import React from 'react';
import { setState } from '../../state/slices/example.slice';
import { useTypedDispatch, useTypedSelector } from '../../state/state';
import styles from './TestPage.module.scss';

export interface ITestPage {
}

// eslint-disable-next-line no-empty-pattern
const TestPage = ({ }: ITestPage) => {
	const count = useTypedSelector(state => state.example.count);
	const dispatch = useTypedDispatch();

	return (
		<div
			className={styles.TestPage}
			onClick={() => dispatch(setState(count + 1))}>
			Test Works { count }
		</div>
	);
};

export default TestPage;
