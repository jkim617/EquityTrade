import React from 'react';
import {Link} from 'react-router-dom';

class SplashBodyWords extends React.Component {
    render() {
        return (
            <div className='splashbodywords'>
                <div className='splashbodyheader'>Investing for Everyone</div>
                <div className='splashbodydescription'>EquityTrade, a pioneer of commission-free investing, gives you
                more ways to make your money work harder.</div>
                
                <Link to="/signup">
                    <button className="splashbody-signup">Sign Up</button>
                </Link>
            </div>
        )
    }
}

export default SplashBodyWords;