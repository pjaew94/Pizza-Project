import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";

import { increaseCount, decreaseCount } from "../../actions/cart";

const CartCounter = ({ itemIndex, cart, increaseCount, decreaseCount }) => {
  const currentCount = cart.cartItems[itemIndex].counter;



  return (
    <div className="cart-counter-container">
      <div className="counter-button" onClick={() => decreaseCount(itemIndex)}>
      <IconContext.Provider value={{ className: "minus-icon" }}>
          <FiMinus />
        </IconContext.Provider>
      </div>
      <h3 className="count">{currentCount}</h3>
      <div className="counter-button" onClick={() => increaseCount(itemIndex)}>
        <IconContext.Provider value={{ className: "plus-icon" }}>
          <HiOutlinePlus />
        </IconContext.Provider>
      </div>
    </div>
  );
};

CartCounter.propTypes = {
  cart: PropTypes.object.isRequired,
  increaseCount: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { increaseCount, decreaseCount })(
  CartCounter
);
