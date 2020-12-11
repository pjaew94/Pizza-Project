import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { IconContext } from "react-icons";
import { FcCheckmark } from "react-icons/fc";

import "./OrderConfirmed.scss";

const OrderConfirmed = ({
  setShowCompletedOrder,
  display,
  orderInfo,
  location,
  sentOrder,
}) => {
  // Sum function for adding up the values in each item
  function sum(array, key) {
    return array.reduce(function (a, b) {
      return a + b[key];
    }, 0);
  }

  let preText =
    location.location.option === "Delivery"
      ? "Your order will arrive in approximately:"
      : "Your order will be ready for pick up within:";
  let estimatedTime =
    location.location.option === "Delivery" ? "45 minutes" : "30 minutes";

  let subTotal;
  let tax;
  let total;
  if (sentOrder) {
    subTotal = Number(sum(sentOrder, "totalCost").toFixed(2));
    tax = Number((subTotal * 0.07).toFixed(2));

    if(location.location.option === "Delivery") {
      total = (tax + subTotal + 2.50).toFixed(2)
    } else {
    total = (tax + subTotal).toFixed(2)
    }
  }

  return (
    <div
      className={`order-confirmed-container ${display && "display-complete"}`}
    >
      <div className="order-confirmed-inner">
        <div className="confirmation-container">
          <div className="thanks">
            Thanks {orderInfo && orderInfo.payer.name.given_name}!
          </div>
          <div className="msg">Your order has been received!</div>
          <div className="check-mark-container">
            <div className="check-mark">
              <IconContext.Provider value={{ className: "check-icon" }}>
                <FcCheckmark />
              </IconContext.Provider>
            </div>
          </div>
          <h3>
            {preText} <span>{estimatedTime}</span>
          </h3>
        </div>

        <div className="order-summary-container" onClick={() => console.log()}>
          <div className="order-summary-text">Order Summary</div>
          <div className='ordered-items-container'>
          {sentOrder &&
            sentOrder.map((item, index) => {
              return (
                <div className="ordered-item" key={index}>
                  <div className="left-container-ordered-item">
                    <div className="item-count">{item.counter}</div>
                    <div className="name-size-container">
                      <div className="item-name">{item.name}</div>
                      <div className="item-size">{item.size && item.size}</div>
                    </div>
                  </div>
                  <div className="item-cost">${item.totalCost}</div>
                </div>
              );
            })}
            </div>
          <div className="order-calculations">
            <div className="subTotal-container box">
              <h4>Subtotal</h4>
              <h4>${subTotal}</h4>
            </div>
            <div className="tax-container box">
              <h4>Tax</h4>
              <h4>${tax}</h4>
            </div>
            {location.location.option === "Delivery" && <div className='delivery-fee-container box'>
              <h4>Delivery Fee</h4>
              <h4>$2.50</h4>
            </div>}
            <div className="total-container box">
              <h4>Total</h4>
              <h4>${total}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderConfirmed.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, null)(OrderConfirmed);
