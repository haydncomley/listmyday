import React, { lazy, Suspense } from 'react';
import { ITemplateNamePage } from './TemplateNamePage';

const TemplateNamePage = lazy(() => import('./TemplateNamePage'));

const LazyTemplateNamePage = (props: ITemplateNamePage & { children?: React.ReactNode; }) => (
	<Suspense fallback={null}>
		<TemplateNamePage {...props} />
	</Suspense>
);

export default LazyTemplateNamePage;
