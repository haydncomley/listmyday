import React, { useEffect, useState } from 'react';
import styles from './TimePicker.module.scss';

const parseTimeSection = (s: string) => {
	const time = Array.from(s).map((x) => parseInt(x) || '');
	return (s.startsWith('0') ? '0' : '') + time.join('') + ((s.length === 2 && s.endsWith('0')) ? '0' : '');
};

const formatTime = (s: string) => {
	if (s.length < 3) {
		return parseTimeSection(s);
	}
	if (s.length === 3 && !s.endsWith(':')) {
		return `${parseTimeSection(s.slice(0, 2))}:${parseTimeSection(s.slice(-1))}`;
	}

	return s.split(':').map((x) => parseTimeSection(x)).join(':');
};

export interface ITimePicker {
	value?: string,
	placeholder?: string,
	onChange?: (time: string) => void
}

const TimePicker = ({ value, placeholder, onChange }: React.PropsWithChildren<ITimePicker>) => {
	const [ time, setTime ] = useState(formatTime(value || ''));
	const [ lastEmit, setLastEmit ] = useState(formatTime(value || ''));

	useEffect(() => {
		const theTime = time.length === 5 ? time : '';
		if (onChange && lastEmit != theTime) {
			onChange(theTime);
			setLastEmit(theTime);
		}
	}, [time]);

	return (
		<div className={styles.TimePicker}>
			<input
				maxLength={5}
				onChange={(val) => setTime(formatTime(val.target.value))}
				placeholder={placeholder || '00:00'}
				type="text"
				value={time} />
		</div>
	);
};

export default TimePicker;
