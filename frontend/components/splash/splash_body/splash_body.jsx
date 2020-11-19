import React from 'react';
import { Link, Route } from 'react-router-dom';

import SplashBodyWords from './splashbodywords';


class SplashBody extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return(
            <div>

            
            <div className='splashbody'>
                <div className='splash-img-body'>
                    <img className='splash-img' src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png" alt=""/>
                    <img className='splash-img-screen' src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png" alt="" />
                </div>
                <SplashBodyWords />

            </div>
            <div className='enddd'>
                © 2020 EquityTrade. All rights reserved.
            </div>
            </div>
        )
    }
}

export default SplashBody;