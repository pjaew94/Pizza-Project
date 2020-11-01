import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { showNav, hideNav } from '../../actions/nav';

import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";

import "./NavbarM.scss";

const NavbarM = ({ showNav, hideNav, displayNav }) => {


  const iconClick = () => {
    if (displayNav) {
      hideNav()
    } else {
      showNav()
    }
  };

  // HTML //
  // Hamburger
  const hamburger = (
    <div data-testid="hamburger" className={`hamburger ${displayNav && 'hide-hamburger'}`}>
      <span data-testid="hamburger-span" className='span-1'></span>
      <span className='span-2'></span>
    </div>
  );

  const arrowIcon = (
    <div data-testid="back-arrow" className={`back-arrow-container ${!displayNav ? 'hide-back-arrow' : null}`}>
      <IconContext.Provider value={{ className: "arrow-icon icon" }}>
        <IoIosArrowBack />
      </IconContext.Provider>
    </div>
  );

  return (
    <div data-testid="navbarM" className="navbarM">
   
        <div
          data-testid="icon-container"
          className="icon-container"
          onClick={() => iconClick()}
        >
          {hamburger}
          {arrowIcon}
   
      </div>
    </div>
  );
};

NavbarM.propTypes = {
  showNav: PropTypes.func.isRequired,
  hideNav: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  displayNav: state.nav.displayNav
});


export default connect(mapStateToProps, { showNav, hideNav })(NavbarM);
