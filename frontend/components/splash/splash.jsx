import React from 'react';
import { Link, Route } from 'react-router-dom';

import SplashNav from './splash_nav/splash_nav';
import SplashBody from './splash_body/splash_body';
import UserNav from '../user_page/user_nav/nav';

class Splash extends React.Component {
    constructor(props) {
        super(props)
    };

    
    render() {
        const entryPage = () => (
            <div className='splash'>
                <SplashNav />
                <SplashBody />
            </div>
        )

        const userPage = () => (
            <div className='user-page'>
                <UserNav/>
            </div>
        )
        
        
        return this.props.currentUser ? userPage() : entryPage();
    }
}

export default Splash;
