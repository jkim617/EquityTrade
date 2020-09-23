import React from 'react';
import { Link, Route } from 'react-router-dom';

import SplashNav from './splash_nav/splash_nav';
import SplashBody from './splash_body/splash_body';

class Splash extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return(
            <div className='splash'>
                <SplashNav />
                <SplashBody />
            </div>
        )
    }
}

export default Splash;
