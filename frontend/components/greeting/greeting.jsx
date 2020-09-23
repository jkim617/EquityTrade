import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = ({ currentUser, logout, login}) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      <div className='splash-login'>
        <Link to="/login">Log In</Link>
      </div>

      <Link to="/signup">
        <button className="splash-signup">Sign Up</button>
      </Link>

      
    </nav>
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
