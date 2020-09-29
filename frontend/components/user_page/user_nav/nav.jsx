import React from 'react';
import { Link } from 'react-router-dom';

import UserNav1 from './usernav1';


const UserNav = () => (
    <div className='user-nav'>
        <img className='black-logo' src="https://pbs.twimg.com/profile_images/1267616128022351873/dZJpsWTD_400x400.jpg" alt=""/>
        <div/>
        <UserNav1/>
    </div>
)

export default UserNav;