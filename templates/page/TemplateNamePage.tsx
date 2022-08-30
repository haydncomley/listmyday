import React from 'react';
import styles from './TemplateNamePage.module.scss';

export interface ITemplateNamePage {
}

// eslint-disable-next-line no-empty-pattern
const TemplateNamePage = ({ }: ITemplateNamePage) => {
	return (
		<div className={styles.TemplateNamePage}>
			TemplateName Works
		</div>
	);
};

export default TemplateNamePage;
