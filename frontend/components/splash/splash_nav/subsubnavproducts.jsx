import React from 'react';

import ProductsDropdown from './products_dropdown';

class SubSubNavProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {arrow: 'down'};
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
        return(
            <div>
                <button className='subsubnavproducts' onClick={this.changeArrow}>
                    <div className='subsubnavproductsword'>Products</div>
                    {this.renderArrow()}
                </button>
                
                <ProductsDropdown arrow={this.state.arrow}/>
            </div>
        )
    }
}

export default SubSubNavProducts;