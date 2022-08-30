import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import './App.scss';
import LazyTestPage from './app/pages/Test/TestPage.lazy';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<LazyTestPage />}
					path='/' />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
