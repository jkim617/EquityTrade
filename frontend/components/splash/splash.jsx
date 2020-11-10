import React from 'react';
import { Link, Route } from 'react-router-dom';

import SplashNav from './splash_nav/splash_nav';
import SplashBody from './splash_body/splash_body';
import UserNavContainer from '../user_page/user_nav/nav_container';
import UserBodyContainer from '../user_page/user_body/userbody_container';

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
                <UserNavContainer pathName={this.props.location.pathname}/>
                <UserBodyContainer stockShow={this.props.location.state} pathName={this.props.location.pathname}/>      
                <div className='extra'/>
            </div>
        )
        
        
        return this.props.currentUser ? userPage() : entryPage();
    }
}

export default Splash;
