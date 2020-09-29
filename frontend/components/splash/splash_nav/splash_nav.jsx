import React from 'react';
import { Link, Route } from 'react-router-dom';

import GreetingContainer from '../../greeting/greeting_container';
import SubNav from './sub_nav';


class SplashNav extends React.Component {
    constructor(props) {
        super(props);
    };
  

    render() {
        return (
            <div className='splashnav'>

                <div className='logo'>
                    <Link to="/">EquityTrade</Link>
                </div>

                <SubNav />


            </div>

        )
    }
};

export default SplashNav;