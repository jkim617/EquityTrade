import React from 'react';

class LearnDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.arrow === 'up' ? 'learn-dropdown-up' : 'learn-dropdown-down'}>
                <li className='learn-dropdown-hover'>Learn</li>
                <li className='learn-dropdown-hover'>Snacks</li>
            </div>
        )
    }
}

export default LearnDropdown;