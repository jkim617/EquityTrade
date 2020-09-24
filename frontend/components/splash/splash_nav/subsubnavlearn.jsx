import React from 'react';

import LearnDropdown from './learn_dropdown';

class SubSubNavLearn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { arrow: 'down' };
        this.changeArrow = this.changeArrow.bind(this);
    };

    changeArrow(e) {
        e.preventDefault();
        if (this.state.arrow === 'down') {
            this.setState({ arrow: 'up' })
        } else {
            this.setState({ arrow: 'down' })
        }

    }

    renderArrow() {
        if (this.state.arrow === 'down') {
            return (<div className='arrow'>{'\u2228'}</div>)
        } else {
            return (<div className='arrow'>{'\u2227'}</div>)
        }
    }

    render() {
        return (
            <div>
                <button className='subsubnavlearn' onClick={this.changeArrow}>
                    <div className='subsubnavlearnword'>Learn</div>
                    {this.renderArrow()}   
                </button>
                <LearnDropdown arrow={this.state.arrow}/>
            </div>
        )
    }
}

export default SubSubNavLearn;