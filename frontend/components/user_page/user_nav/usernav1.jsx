import React from 'react';
import { Link } from 'react-router-dom';

import Greeting_Container from '../../greeting/greeting_container';



const UserNav1 = () => (
        <ul className='user-nav-1'>
            <li>Free Stocks</li>
            <li>Portfolio</li>
            <li>Cash</li>
            <li>Messages</li>
            <li><Greeting_Container/></li>
        </ul>
)

export default UserNav1;