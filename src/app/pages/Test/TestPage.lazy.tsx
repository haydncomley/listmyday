import React, { lazy, Suspense } from 'react';
import { ITestPage } from './TestPage';

const TestPage = lazy(() => import('./TestPage'));

const LazyTestPage = (props: ITestPage & { children?: React.ReactNode; }) => (
	<Suspense fallback={null}>
		<TestPage {...props} />
	</Suspense>
);

export default LazyTestPage;
