import React from 'react';
import { Link, Route } from 'react-router-dom';

import SplashBodyWords from './splashbodywords';


class SplashBody extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return(
            <div className='splashbody'>
                <SplashBodyWords />
            </div>
     
        )
    }
}

export default SplashBody;