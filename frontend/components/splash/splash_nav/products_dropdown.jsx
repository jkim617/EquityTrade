import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithubSquare,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';

class ProductsDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const gitHub = <FontAwesomeIcon className='nav-icon' icon={faGithubSquare} />
        const linkedIn = <FontAwesomeIcon className='nav-icon' icon={faLinkedin} />
        return (
            <div className={this.props.arrow === 'up' ? 'products-dropdown-up' : 'products-dropdown-down'}>
                <div className='products-dropdown-up-sub'>
                    <li className='products-dropdown-hover'><a href='https://www.github.com/jkim617'>{gitHub}</a></li>
                    <li className='products-dropdown-hover'><a href='https://www.linkedin.com/in/kun-hee-kim-0b23b013b'>{linkedIn}</a></li>
                    <li className='products-dropdown-hover'><a href='mailto: kunhee617@gmail.com'>Email</a></li>
                    <li className='products-dropdown-|'>|</li>
                    <li className='products-dropdown-crypto'>Thanks for visiting!</li>
                </div>
  
            </div>
        )
    }
}

export default ProductsDropdown;