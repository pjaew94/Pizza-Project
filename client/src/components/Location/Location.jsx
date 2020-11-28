import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setLocation } from "../../actions/location";
import { Redirect } from "react-router-dom";

import "./Location.scss";
import pizzaDelivery from "../../media/pizza-delivery.png";
import pizzaCarry from "../../media/pizza-carry.png";

const Location = ({ setLocation, location }) => {
  const [formData, setFormData] = useState({
    option: "",
    addressType: "",
    streetAddress: "",
    suiteApt: "",
    zipCode: "",
  });

  const [showWarning, setShowWarning] = useState(false);

  const [orderOption, setOrderOption] = useState();

  const { option, addressType, streetAddress, suiteApt, zipCode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(option) {
    setLocation(formData);
    } else {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 2000)
    }
  };

  const setOption = (e) => {
    if (e === true) {
      setOrderOption(true);
      setFormData({option: "Delivery"})
    } else {
      setOrderOption(false);
      setFormData({option: "Carry Out"})
    }
  };

  const addressForm = (
    <div className="form-inner">
      <div className="input-container">
        <h3>Address Type</h3>
        <select
          value={addressType}
          name="addressType"
          onChange={(e) => onChange(e)}
          defaultValue=""
        >
        <option disabled={true} value="">
          Select
        </option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Business">Business</option>
          <option value="Campus/Base">Campus/Base</option>
          <option value="Hotel">Hotel</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-container">
        <h3>Street Address</h3>
        <input
          type="text"
          placeholder=""
          name="streetAddress"
          value={streetAddress}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="input-container">
        <h3>Suite/Apt</h3>
        <input
          type="text"
          placeholder=""
          name="suiteApt"
          value={suiteApt}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="input-container last-input">
        <h3>Zip Code</h3>
        <input
          type="text"
          placeholder=""
          name="zipCode"
          value={zipCode}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  );

  const carryOut = (
    <div className="carry-out">
      <h1>Great!</h1>
      <h3>
        Pick up your order at 777 Best Pizza Ct. 17742, Los Angeles California
      </h3>
      <h3></h3>
    </div>
  );

    if(location.location.option) {
        return <Redirect to='/menu' />
    }

    const warning = (
      <div className={`warning-container ${showWarning && 'show-warning'}`}>
        <h4>Please choose one of the options!</h4>
      </div>
    )

  return (
    <div className="location-container">
      <div className="inner">
        <div className="delivery-or-carryOut">
          <div
            className={`d-or-c-selector ${orderOption && "selected-option"}`}
            onClick={() => setOption(true)}
          >
            <img src={pizzaDelivery} alt="pizza delivery guy" />
            <h3>Delivery</h3>
          </div>
          <div
            className={`d-or-c-selector ${
              orderOption === false ? "selected-option" : null
            }`}
            onClick={() => setOption(false)}
          >
            <img src={pizzaCarry} alt="pizza delivery guy" />
            <h3>Carry Out</h3>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          {orderOption && addressForm}
          {orderOption === false ? carryOut : null}
          <input className="submit-input" type="submit" value="Start Order!"  />
        </form>
      </div>
      {warning}
    </div>
  );
};

Location.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,       
};

const mapStateToProps = (state) => ({
    location: state.location
  });

export default connect(mapStateToProps, { setLocation })(Location);
