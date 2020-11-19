import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown,
        faChevronUp} from '@fortawesome/free-solid-svg-icons';
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
        const downArrow = <FontAwesomeIcon className='arrow-icon' icon={faChevronDown} />
        const upArrow = <FontAwesomeIcon className='arrow-icon' icon={faChevronUp}/>
        if (this.state.arrow === 'down') {
            return(<div>{downArrow}</div>)
        } else {
            return (<div>{upArrow}</div>)
        }
    }


    render() {
        
        return(
            <div>
                <button className='subsubnavproducts' onClick={this.changeArrow}>
                    <div className='subsubnavproductsword'>About Me</div>
                    {this.renderArrow()}
                </button>
                
                <ProductsDropdown arrow={this.state.arrow}/>
            </div>
        )
    }
}

export default SubSubNavProducts;