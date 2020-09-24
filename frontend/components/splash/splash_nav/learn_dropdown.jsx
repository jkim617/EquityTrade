import React from 'react';

class LearnDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.arrow === 'up' ? 'learn-dropdown-up' : 'learn-dropdown-down'}>
                <div className={this.props.arrow === 'up' ? 'learn-dropdown-up-sub' : 'learn-dropdown-down-sub'}>
                    <li className='learn-dropdown-hover'>Learn</li>
                    <li className='learn-dropdown-hover'>Snacks</li>
                </div>
            </div>
        )
    }
}

export default LearnDropdown;