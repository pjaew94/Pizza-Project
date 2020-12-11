import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import allIcon from "../../media/icon-all.svg";
import drinkIcon from "../../media/icon-drink.svg";
import pastaIcon from "../../media/icon-pasta.svg";
import pizzaIcon from "../../media/icon-pizza.svg";
import sidesIcon from "../../media/icon-sides.svg";
import saladIcon from "../../media/icon-salad.svg";
import chickenIcon from "../../media/icon-chicken.svg";

import Menu from "../Menu/Menu";
import MiniCart from '../MiniCart/MiniCart'
import "./Dashboard.scss";
import ScrollContainer from 'react-indiana-drag-scroll' 

const Dashboard = ({ location: { location } }) => {


  const [menu, setMenu] = useState();
  const [filteredMenu, setFilteredMenu] = useState();
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/menu");

      setMenu(res.data);
      setFilteredMenu(res.data);
    }
    fetchData();
  }, []);

  const { option, streetAddress, suiteApt, zipCode } = location;

  //   menu selector.
  const menuSelectors = [
    {
      icon: allIcon,
      text: "All",
    },
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

  // Filters entire menu to the category chosen
  const filterMenu = (category) => {
    setSelected(category);

    if (category === "all") {
      setFilteredMenu(menu);
    } else {
      const filtered = menu.filter(function (i) {
        return i.category === category;
      });

      setFilteredMenu(filtered);
    }
  };

  const header = (
    <div className="order-option-address-container">
      <div className="inner">
        <div className="inner2">
          <h2>{option === "Delivery" ? "Food Delivery" : "Carry Out"}</h2>
          <h3>
            {option === "Delivery"
              ? `${streetAddress}${suiteApt ? " " + suiteApt : ""}, ${zipCode}`
              : "777 Best Pizza Ct. 17742, Los Angeles California"}
          </h3>
        </div>
      </div>
    </div>
  );

  const menuSelection = (
    <ScrollContainer horizontal={true} className="menu-selection-container">
      <div className="inner">
        {menuSelectors.map((item) => {
          return (
            <div
              className={`menu-selector-container ${item.text} ${
                selected === item.text.toLowerCase() && "selected-option"
              }`}
              key={item.text}
              onClick={() => filterMenu(item.text.toLowerCase())}
            >
              <img src={item.icon} alt="icon img" />
              <h3>{item.text}</h3>
            </div>
          );
        })}
      </div>
    </ScrollContainer>
  );

  return (
    <Fragment>
    <div className='dashboard-container'>
      {header}
      {menuSelection}
      {filteredMenu && <Menu filteredMenu={filteredMenu} />}
      <MiniCart />
      </div>
</Fragment>
  );
};

Dashboard.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
});

export default connect(mapStateToProps, null)(Dashboard);
