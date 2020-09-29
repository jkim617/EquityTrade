import React from 'react';
import { LineChart,
        Line,
        XAxis,
        YAxis,
        Tooltip,
        ResponsiveContainer } from 'recharts';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: '1W',
            portfolioValues: []
        };
    }

    componentDidMount() {
       
        this.props.fetchIntradayPrices('UBER')
    };





    render() {
    
       
        const renderLineChart = (
            <LineChart width={676} height={196} data={this.props.stocks['UBER']}>
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 5 }} dot={false} />
                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                

    
            </LineChart>
        );
        return (
            <div>
                {renderLineChart}
            </div>

        )
    }
}

export default Dashboard;