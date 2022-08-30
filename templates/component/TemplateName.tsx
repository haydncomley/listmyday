import React from 'react';
import styles from './TemplateName.module.scss';

export interface ITemplateName {
}

// eslint-disable-next-line no-empty-pattern
const TemplateName = ({ }: ITemplateName) => {
	return (
		<div className={styles.TemplateName}>
			TemplateName Works
		</div>
	);
};

export default TemplateName;
