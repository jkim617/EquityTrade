import React from 'react';

class News extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='news'>
                <div className='news-header'>News</div>
                <div className='news-button-container'>
                    <button className='news-button'>Show newer articles</button>
                </div>
                <div className='user-page-bottom'>
                    For more information, see my<a className='github-links' href='https://github.com/jkim617/EquityTrade'> GitHub</a>!
                </div>

            </div>
        )
    }
}

export default News;