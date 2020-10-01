import React from 'react';
import DashboardContainer from '../../dashboard/dashboard_container';
import News from './news/news';

class UserBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='user-body'>
                <div className='user-body-container'>
                    <div className='user-body-left'>
                        <DashboardContainer />
                        <div className='news'>
                            <News />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBody