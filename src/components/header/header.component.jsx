import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector'
import {signOutStart} from '../../redux/user/user.actions'

// import './header.styles.scss'
import {HeaderContainer,LogoContainer,OptionsContainer,OptionDiv,OptionLink} from './header.styles'

const Header = ({currentUser,hidden,signOutStart}) => {
    return(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink  to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACTS
            </OptionLink>
            {
                currentUser ?
                    <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
                    :
                    <OptionLink  to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown />
            }
    </HeaderContainer>
    )
}
const mapStateToProps =createStructuredSelector ({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
});
const mapDispatchToProps = dispatch => ({
    signOutStart:()=>dispatch(signOutStart())
})

export default connect(mapStateToProps)(Header);