import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FaHome, FaCarAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { CgShoppingBag } from "react-icons/cg";
import { IconContext } from "react-icons";

import { hideNav } from "../../actions/nav";
import { removeLocation } from '../../actions/location';

import "./NavigatorM.scss";

const NavigatorM = ({ hideNav, displayNav, removeLocation }) => {
  const navLinks = [
    {
      to: "/",
      text: "Main",
      icon: <FaHome />,
    },
    {
      to: "/location",
      text: "Delivery Option",
      icon: <FaCarAlt />,
    },
    {
      to: "/menu",
      text: "Menu",
      icon: <MdRestaurantMenu />,
    },
    {
      to: "/cart",
      text: "Cart",
      icon: <CgShoppingBag />,
    },
  ]; 

  const hideNavAndRemoveDeliveryOption = (link) => {
    if(link === "Delivery Option") {
        removeLocation()
        hideNav(true)
    } else  {
        hideNav(true)
    }
  }

  return (
    <div
      data-testid="navigator"
      className={`navigator-container ${
        displayNav === true ? "show-navigator" : null
      }`}
    >
      <div className="inner">
        <div className="links">
          {navLinks.map((link, index) => {
            return (
              <Link key={index} to={link.to} className='link' onClick={() => hideNavAndRemoveDeliveryOption(link.text)}>
                <IconContext.Provider value={{ className: "link-icon" }}>
                  {link.icon}
                </IconContext.Provider>
                <h4>{link.text}</h4>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="backdrop" onClick={() => hideNav()} />
    </div>
  );
};

NavigatorM.propTypes = {
  displayNav: PropTypes.bool.isRequired,
  removeLocation: PropTypes.func.isRequired,
  
};

const mapStateToProps = (state) => ({
  displayNav: state.nav.displayNav,
});

export default connect(mapStateToProps, { hideNav, removeLocation })(NavigatorM);
