import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selctCurrentUser } from '../../redux/user/user.selector';
import {selectCartHidden} from '../../redux/cart/cart.selector'

import './header.styles.scss'

const Header = ({currentUser,hidden}) => {
    return(
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/shop">
                CONTACTS
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to="/signin">SIGN IN</Link>
            }
            <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
    </div>
    )
}
const mapStateToProps =createStructuredSelector ({
    currentUser:selctCurrentUser,
    hidden:selectCartHidden
});

export default connect(mapStateToProps)(Header);