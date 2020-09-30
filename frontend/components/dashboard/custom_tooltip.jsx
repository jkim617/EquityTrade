import React from 'react';

const CustomToolTip = ({ active, payload }) => {

    if (payload !== null && active) {
        return (
            <div className="custom-tooltip">
                <p className="desc">{payload[0].payload.label}</p>
            </div>
        );
    } else {
        return null;
    }
};

export default CustomToolTip;