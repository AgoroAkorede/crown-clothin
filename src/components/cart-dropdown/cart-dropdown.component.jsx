import React,{useState} from 'react';
import {connect} from 'react-redux'

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { useNavigate } from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {toggleCartHidden} from '../../redux/cart/cart.action'

import './cart-dropdown.styles.scss';



const CartDropdown = ({ cartItems, dispatch }) => {

    const navigate = useNavigate();
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                { cartItems.length ?
                    cartItems.map(cartItem => (
                        <CartItem key={ cartItem.id } item={ cartItem } />
                    ))
                    :
                    <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <Button onClick={ () => {
                navigate("/checkout");
                dispatch(toggleCartHidden() )
            }
            }> GO TO CHECKOUT </Button>
        </div>)
};
const mapStateToProps = createStructuredSelector ({
    cartItems:selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);