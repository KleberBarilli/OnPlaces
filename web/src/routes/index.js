import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NewCity from '../pages/NewCity';
import Cities from '../pages/Cities';
import City from '../pages/City';

export default function Routes(){
	return(
		<Switch>
			<Route exact path="/" component={SignIn} />
			<Route exact path="/register" component={SignUp} />
			<Route exact path="/cities" isPrivate component={Cities} />
			<Route exact path="/city/:id" isPrivate component={City} />
			<Route exact path="/dashboard" component={Dashboard} isPrivate />
			<Route exact path="/profile" component={Profile} isPrivate />
			<Route exact path="/newcity" component={NewCity} isPrivate />
			<Route exact path="/newcity/:id" component={NewCity} isPrivate />
		</Switch>
	)

}
