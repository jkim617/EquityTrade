import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import Splash from './splash/splash';
import SignUp from './signup_page/signup';
import LogIn from './login_page/login';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';



const App = () => (
    <div>
        <header className="nav-bar">

        
        </header>
        <Switch>
            <AuthRoute exact path="/login" component={LogIn} />
            <AuthRoute exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Splash} />
            
        </Switch>
    </div>
);

export default App;
