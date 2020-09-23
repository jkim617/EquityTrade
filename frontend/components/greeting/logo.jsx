import React from "react";
import {Link} from 'react-router-dom'

class Logo extends React.Component {
    render() {
        return(
            <Link to="/" className="logo-link">
                <img className="logo" src={window.logoURL} />
            </Link>
        )
    }
};

export default Logo;