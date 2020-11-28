import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { IconContext } from "react-icons";
import { CgShoppingBag } from 'react-icons/cg'

import './MiniCart.scss'

const MiniCart = ({cart: { itemCount, finalCost}}) => {

    return <Link className='mini-cart-container' to='/cart'>
        <div className='left-container'>
        <IconContext.Provider value={{ className: "cart-icon" }}>
              <CgShoppingBag />
            </IconContext.Provider>
            <h3>{itemCount} Items</h3>
        </div>
        <div className='cost-container'>
            ${finalCost}
        </div>
    </Link>

}


MiniCart.propTypes = {
    cart: PropTypes.object.isRequired,
    }

const mapStateToProps = (state) => ({
    cart: state.cart
  });

export default connect(mapStateToProps, null)(MiniCart);