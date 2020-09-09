import React from 'react';
import { Router } from 'react-router-dom';
import { history } from './history';
import Routes from './routes';
import './App.css';

function App() {
	return (
		<Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
			<div className="app theme-light ">
				<div className="site-content">
					<Routes />
				</div>
			</div>
		</Router>
	);
}

export default App;
