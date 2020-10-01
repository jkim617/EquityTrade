import React from 'react';

const CustomToolTip = ({ active, payload, range }) => {

    if (payload !== null && active) {
        
        return (
           
            <div className="custom-tooltip">
                {range === '1D' ? <p className='tooltip-time'>{payload[0].payload.time}</p> : ''}

                <p className='tooltip-value'>{payload[0].payload.close}</p>
                <p className='tooltip-date'>{payload[0].payload.formattedDate}</p>
                
                
            </div>
        );
    } else {
        return null;
    }
};

export default CustomToolTip;