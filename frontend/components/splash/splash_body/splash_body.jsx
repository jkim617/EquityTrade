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
                <div className='splash-img-body'>
                    <img className='splash-img' src="https://cdn.robinhood.com/assets/robinhood/brand/1x__350f48095cefa5b4a8139e5797e5232d.png" alt=""/>
                </div>
                <SplashBodyWords />

            </div>
     
        )
    }
}

export default SplashBody;