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
                    For more information, see our<a className='signup-links' href='https://google.com/'> Privacy Policy.</a>
                </div>

            </div>
        )
    }
}

export default News;