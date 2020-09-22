import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign up',
        navLink: <div>
            Already started?
            <br />
            <br />
            <Link to="/login">Log in to complete your application</Link>
            </div>,
        submitButton: 'Continue',
        description: <div>
            <h2>Make Your Money Move</h2>
            <p>EquityTrade lets you invest in companies you love, commission-free.</p>
            </div>
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
