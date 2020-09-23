import React from 'react';
import { Link, Route } from 'react-router-dom';

import SubSubNav from './subsubnav';
import GreetingContainer from '../../greeting/greeting_container';


class SubNav extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return(
            <div className='subnav'>
                <SubSubNav />
                <GreetingContainer />
            </div>
        )
    }


}

export default SubNav;

