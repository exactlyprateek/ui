import React from 'react';

import './static/scss/app.scss';
import 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Header from './components/presentation/header';
import Footer from './components/presentation/footer';
import LandingPage from './components/presentation/landingPage';
import GettingStarted from './components/presentation/gettingStarted';
import Login from './components/presentation/login';
import Register from './components/presentation/register';
import AboutUs from './components/presentation/aboutUs';
import Contacts from './components/presentation/contact';
import Education from './components/presentation/education';
import Finalize from './components/presentation/finalizePage';
import PrivateRoute from './components/PrivateRoute';
function App() {
	return (
		<div>
			<Header />

			<Switch>
				<PrivateRoute path="/education" component={Education} />
				<PrivateRoute path="/contact" component={Contacts} />
				<PrivateRoute path="/getting-started" component={GettingStarted} />
				<PrivateRoute path="/resume-templates" component={GettingStarted} />
				<Route path="/about-us" component={AboutUs} />
				<PrivateRoute path="/finalize" component={Finalize} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/" component={LandingPage} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
