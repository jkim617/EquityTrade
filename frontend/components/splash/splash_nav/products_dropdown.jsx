import React from 'react';

class ProductsDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.arrow === 'up' ? 'products-dropdown-up' : 'products-dropdown-down'}>

                <li className='products-dropdown-hover'>Stocks & Funds</li>
                <li className='products-dropdown-hover'>Options</li>
                <li className='products-dropdown-hover'>Gold</li>
                <li className='products-dropdown-hover'>Cash Management</li>
                <li className='products-dropdown-|'>|</li>
                <li className='products-dropdown-crypto'>Crypto</li>
  
            </div>
        )
    }
}

export default ProductsDropdown;