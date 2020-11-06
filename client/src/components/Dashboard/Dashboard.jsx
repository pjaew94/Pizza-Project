import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import drinkIcon from "../../media/icon-drink.svg";
import pastaIcon from "../../media/icon-pasta.svg";
import pizzaIcon from "../../media/icon-pizza.svg";
import sidesIcon from "../../media/icon-sides.svg";
import saladIcon from "../../media/icon-salad.svg";
import chickenIcon from "../../media/icon-chicken.svg";

import "./Dashboard.scss";

const Dashboard = ({ location: { location } }) => {
  const [menu, setMenu] = useState();
  const [selected, setSelected] = useState('Pizza');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/menu");

      setMenu(res.data);
    }
    fetchData();
  }, []);

  const { option, addressType, streetAddress, suiteApt, zipCode } = location;

  const menuSelectors = [
    {
      icon: pizzaIcon,
      text: "Pizza",
    },
    {
      icon: chickenIcon,
      text: "Wings",
    },
    {
      icon: sidesIcon,
      text: "Sides",
    },
    {
      icon: saladIcon,
      text: "Salad",
    },
    {
      icon: pastaIcon,
      text: "Pasta",
    },
    {
      icon: drinkIcon,
      text: "Beverages",
    },
  ];

  const header = (
    <div className="order-option-address-container">
      <div className="inner">
        <h2>{option === "Delivery" ? "Food Delivery" : "Carry Out"}</h2>
        <h3>
          {option === "Delivery"
            ? `${streetAddress}${suiteApt ? " " + suiteApt : ""}, ${zipCode}`
            : "Carry Out"}
        </h3>
      </div>
    </div>
  );

  const menuSelection = (
    <div className="menu-selection-container">
      {menuSelectors.map((item) => {
        return (
          <div
            className={`menu-selector-container ${
              selected === item.text && "selected-option"
            }`}
            key={item.text}
            onClick={() => setSelected(item.text)}
          >
            <img src={item.icon} alt="icon img" />
            <h3>{item.text}</h3>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="dashboard-container">
      {header}
      {menuSelection}
    </div>
  );
};

Dashboard.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, null)(Dashboard);
