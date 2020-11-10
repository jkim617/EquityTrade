import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './searchbar';
import UserNav1 from './usernav1';


class UserNav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        debugger
        const linkTarget = {
            pathname: '/',
            key: Math.random(),
            state: {
                applied: false
            }
        }
        return (
            <div className='user-nav'>
                <Link to={linkTarget}><img className='black-logo' src="https://pbs.twimg.com/profile_images/1267616128022351873/dZJpsWTD_400x400.jpg" alt="" /></Link>
                <SearchBar props={this.props} />
                <UserNav1 />
            </div>


        )
    }
    
}

export default UserNav;