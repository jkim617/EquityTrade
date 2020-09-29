import React from 'react';
import DashboardContainer from '../../dashboard/dashboard_container';

class UserBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <DashboardContainer />
            </div>
        )
    }
}

export default UserBody