import React, { lazy, Suspense } from 'react';
import { IDayPage } from './DayPage';

const DayPage = lazy(() => import('./DayPage'));

const LazyDayPage = (props: IDayPage & { children?: React.ReactNode; }) => (
	<Suspense fallback={null}>
		<DayPage {...props} />
	</Suspense>
);

export default LazyDayPage;
