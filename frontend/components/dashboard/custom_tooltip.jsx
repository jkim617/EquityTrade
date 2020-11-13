import React from 'react';

class CustomToolTip extends React.Component {
    constructor(props) {
        super(props) 
 // active, payload, range, fn
    }

  

    render() {
        
        if (this.props.payload !== null && this.props.active) {
         
            return (
            
                <div className="custom-tooltip">
                    {this.props.range === '1D' ? <p className='tooltip-time'>{this.props.payload[0].payload.time}</p> : ''}

                    <p className='tooltip-value'>{this.props.payload[0].payload.close}</p>
                    <p className='tooltip-date'>{this.props.payload[0].payload.formattedDate}</p>
                    
                    
                </div>
            );
        } else {
            return null;}
    }
};

export default CustomToolTip;