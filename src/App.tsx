import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import './App.scss';
import LazyDayPage from './app/pages/Day/DayPage.lazy';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<LazyDayPage />}
					path='/' />
				<Route
					element={<LazyDayPage />}
					path='/:date' />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
