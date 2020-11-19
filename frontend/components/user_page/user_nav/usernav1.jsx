import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faGithubSquare,
        faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';


import Greeting_Container from '../../greeting/greeting_container';



const UserNav1 = () => {
    const gitHub = <FontAwesomeIcon className='nav-icon' icon={faGithubSquare}/>
    const linkedIn = <FontAwesomeIcon className='nav-icon' icon={faLinkedin}/>
    const email = <FontAwesomeIcon classname='email-icon' icon={faEnvelope}/>
    return(
        <div className='user-nav-1'>
            <div><a href='https://www.github.com/jkim617'>{gitHub}</a></div>
            <div><a href='https://www.linkedin.com/in/kun-hee-kim-0b23b013b'>{linkedIn}</a></div>
            {/* <div className='email-li'><a href='mailto: kunhee617@gmail.com' className='email-li-2'>{email}</a></div> */}
            <div><a href='mailto: kunhee617@gmail.com'>Email</a></div>
            <div><Greeting_Container /></div>
        </div>
    )
}
    

export default UserNav1;