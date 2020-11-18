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

    formatDateNews(datetime) {
        const monthsKey = {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
        }

        const check = new Date(datetime);
        const currentCheck = new Date();

        const month = check.getMonth() + 1;
        const currentMonth = currentCheck.getMonth() + 1;

        const day = check.getDate();
        const currentDay = currentCheck.getDate();

        const hour = check.getHours();
        const currentHour = currentCheck.getHours();

        const min = check.getMinutes();
        const currentMin = currentCheck.getMinutes();

        if (month === currentMonth && day === currentDay) {
            if (hour === currentHour) {
                return parseInt(currentMin - min) + ' min'
            }
            else {
                return parseInt(currentHour - hour) + 'h'
            }
            
        } else {
            return monthsKey[month] + ' ' + parseInt(day)
        }
    }

    renderNewsSummary(summary) {
        if (summary.length > 100) {
            return summary.slice(0,100) + '...'
        }
        else {
            return summary
        }
    }

    renderNews() {
       
        const news = this.props.props.pathName === '/' ? this.props.props.generalNews : this.props.props.stockNews
    

        if (news !== undefined) {
        return news.map((name, i) => {
            return (
                <a href={name.qmUrl} className='individual-news-container'>
                    {/* <div className='individual-news-container'> */}
                    <div className='individual-news-description'>
                        <div className='individual-news-header'>
                            <div className='news-source'>{name.source}</div>
                            <div className='news-date'>{this.formatDateNews(name.datetime)}</div>
                        </div>
                        <div className='news-headline'>
                            <div>{name.headline}</div>
                        </div>
                        <div className='news-summary'>
                            <div>{this.renderNewsSummary(name.summary)}</div>
                        </div>

                    </div>
                    <div className='news-image-container'>
                        <img className='news-image' src={this.props.props.pathName === '/'? name.imageUrl : name.image} />
                    </div>
                {/* </div> */}
                </a>
            )
        }
        )
    }
    }

    render() {
        return(
            <div className='news'>
                <div className='news-header'>News</div>
                <div className='news-button-container'>
                    
                    {this.renderNews()}
                    
                    
                    
                </div>
                <div className='user-page-bottom'>
                    For more information, see my<a className={this.signReturn() === '+' ? 'github-links' : 'github-links-red'} href='https://github.com/jkim617/EquityTrade'> GitHub</a>!
                </div>

            </div>
        )
    }
}

export default News;