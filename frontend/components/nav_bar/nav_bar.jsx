import React from "react";
import GreetingContainer from '../greeting/greeting_container';
import Logo from '../greeting/logo'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Logo />
                <GreetingContainer />
            </div>
        )
    }
}

export default NavBar;