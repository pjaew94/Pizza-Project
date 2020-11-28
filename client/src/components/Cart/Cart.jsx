import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeItem } from "../../actions/cart";
import "./Cart.scss";

import CartCounter from "../CartCounter/CartCounter";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import PayPal from "../PayPal/PayPal";
import OrderConfirmed from "../OrderConfirmed/OrderConfirmed";
import CheckOutReject from '../CheckOutReject/CheckOutReject';

const Cart = ({ cart, removeItem, location }) => {
  const [deletionIndex, setDeletionIndex] = useState();
  const [display, setDisplay] = useState(false);
  const [itemName, setItemName] = useState();
  const [showReject, setShowReject] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [orderInfo, setOrderInfo] = useState();
  const [sentOrder, setSentOrder] = useState();

  const [showCompletedOrder, setShowCompletedOrder] = useState(false);

  // Shows warning for confirmation before removing the warning.
  const showWarning = (index, name) => {
    setDeletionIndex(index);
    setItemName(name);
    setDisplay(true);
  };

  // Removes the item upon confirmation. Removes the warning popup
  const deleteItem = () => {
    removeItem(deletionIndex);
    setDeletionIndex();
    setDisplay(false);
  };

  // Each menu item that are in the cart mapped
  const mappedCart = cart.cartItems.map((item, index) => {
    return (
      <div className="cart-item-container" key={index}>
        <img src={item.link} alt={item.name} />
        <div className="name-size-container">
          <h2 className="item-name">{item.name}</h2>
          <h3 className="item-size">{item.size}</h3>
        </div>
        <div className="counter-delete-container">
          <CartCounter itemIndex={index} />
          <div
            className="delete-item-button"
            onClick={() => showWarning(index, item.name)}
          >
            Delete
          </div>
        </div>
        <div className="prices-container">${item.totalCost}</div>
      </div>
    );
  });

  // Cost variables
  let tax = Number((cart.finalCost * 0.07).toFixed(2));

  let finalCost =
    location.location.option === "Delivery"
      ? (Number(cart.finalCost) + 2.5 + tax).toFixed(2)
      : (Number(cart.finalCost) + tax).toFixed(2);

  const checkForTotal = () => {
    if(Number(cart.finalCost) > 15.00) {
        setCheckOut(true)
    } else {
        setShowReject(true);
    }
  }

  return (
    <Fragment>
      <DeleteConfirm
        deleteItem={deleteItem}
        display={display}
        setDisplay={setDisplay}
        itemName={itemName}
      />
      <CheckOutReject 
          setShowReject={setShowReject}
          showReject={showReject}
      />

      <div className="cart-container">
        <PayPal
          setSentOrder={setSentOrder}
          setOrderInfo={setOrderInfo}
          setCheckOut={setCheckOut}
          setShowCompletedOrder={setShowCompletedOrder}
     
          checkOut={checkOut}
          cost={finalCost}
          
        />
        <OrderConfirmed
          setShowCompletedOrder={setShowCompletedOrder}
          orderInfo={orderInfo}
          display={showCompletedOrder}
          sentOrder={sentOrder}
 
        
        />
        <h2>Cart</h2>
        <div className="cart-items-container">{cart && mappedCart}</div>
        <div className="final-container">
          <div className="food-beverage-cost">
            <h4>Food & Beverage:</h4>
            <h4>${cart.finalCost}</h4>
          </div>
          {location.location.option === "Delivery" && (
            <div className="delivery-charge-cost">
              <h4>Delivery Charge:</h4>
              <h4>$2.50</h4>
            </div>
          )}
          <div className="taxes-cost">
            <h4>Taxes:</h4>
            <h4>${tax}</h4>
          </div>
          <div className="total-cost">
            <h3>Order Total:</h3>
            <h3>${finalCost}</h3>
          </div>
        </div>
        <div onClick={() => checkForTotal()} className="paypal-button">
          Confirm Order
        </div>
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  location: state.location,
});

export default connect(mapStateToProps, { removeItem })(Cart);
