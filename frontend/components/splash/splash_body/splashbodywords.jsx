import React from 'react';
import {Link} from 'react-router-dom';

class SplashBodyWords extends React.Component {
    render() {
        return (
            <div className='splashbodywords'>
                <h1 className='splashbodyheader'>Investing for Everyone</h1>
                <h1 className='splashbodydescription'>Robinhood, a pioneer of commission-free investing, gives you
                more ways to make your money work harder.</h1>
                
                <Link to="/signup">
                    <button className="splashbody-signup">Sign Up</button>
                </Link>
            </div>
        )
    }
}

export default SplashBodyWords;