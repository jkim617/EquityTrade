import React from 'react';

class News extends React.Component {
    constructor(props) {
        super(props)
    }

    signReturn() {
        if (this.props.state.portfolioValues.length > 0) {
            return ((((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
                / this.props.state.portfolioValues[0].close) >= 0 ? '+' : '')
        }
    }

    render() {
        return(
            <div className='news'>
                <div className='news-header'>News</div>
                <div className='news-button-container'>
                    <button className={this.signReturn() === '+' ? 'news-button' : 'news-button-red'}>Show newer articles</button>
                </div>
                <div className='user-page-bottom'>
                    For more information, see my<a className={this.signReturn() === '+' ? 'github-links' : 'github-links-red'} href='https://github.com/jkim617/EquityTrade'> GitHub</a>!
                </div>

            </div>
        )
    }
}

export default News;