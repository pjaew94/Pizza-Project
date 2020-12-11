import React, { useRef, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearCart } from '../../actions/cart'

import './PayPal.scss'

const PayPal = ({ setSentOrder, setShowCompletedOrder, setOrderInfo, setCheckOut, checkOut, cost, clearCart, cart }) => {
    const paypal = useRef()

    useEffect(() => {
        if(window.myButton) window.myButton.close();
        window.myButton = window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Your Order",
                            amount: {
                                currency_code: "USD",
                                value: (Number(cost)).toFixed(2)
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                setOrderInfo(order);
                setSentOrder(cart.cartItems);
                setShowCompletedOrder(true);
                setCheckOut(false);

                clearCart()
            },
            onError: (err) => {
                console.log(err)
            }

        })

        window.myButton.render(paypal.current);
    }, [cost])

    return (
        <div className={`paypal-container ${checkOut && "show-paypal"}`}>
            <div className='paypal-back-button' onClick={() => setCheckOut(false)}>
                <IconContext.Provider value={{ className: "paypal-back-icon" }}>
                <IoIosArrowForward />
                </IconContext.Provider>
            </div>
            <div className='checkout-text'>Check Out</div>
            <div ref={paypal} className='paypal-container-inner'></div>
        </div>
    )
}

PayPal.propTypes = {
    clearCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    cart: state.cart,
    location: state.location,
  });

export default connect(mapStateToProps, { clearCart })(PayPal)