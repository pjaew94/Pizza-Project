import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../../actions/cart";
import { showAlert } from "../../actions/alert";

import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ScrollContainer from 'react-indiana-drag-scroll';


import "./Menu.scss";

const Menu = ({ filteredMenu, addItem, showAlert }) => {


  // Counts the quantity the user selected
  const [counter, setCounter] = useState(1);
  // Current cost. (This will not be the one being displayed. it's used to calculate)
  const [currentCost, setCurrentCost] = useState();
  // Keeps costs updated on the modifier ( This will be the one being displayed)
  const [totalCost, setTotalCost] = useState();
  // Current size of item
  const [size, setSize] = useState();
  // Stores the item info for the selected item in the modifier
  const [selectedItem, setSelectedItem] = useState({});
  // Slides modifier in and out
  const [modifierSlider, setModifierSlider] = useState(false);
  // add on slider
  const [addOnsSlider, setAddOnsSlider] = useState(false);

  // Filters through the menu and also sets the correct text for "medium" value
  const filteredMenuItems = filteredMenu.map((item) => {
    let sizeCaloriesConditional;
    if (item.category === "pizza") {
      sizeCaloriesConditional = "Medium";
    } else if (item.category === "wings") {
      sizeCaloriesConditional = "10 Pieces";
    } else if (
      item.category === "sides" ||
      item.category === "pasta" ||
      item.category === "salad"
    ) {
      sizeCaloriesConditional = "One Size";
    } else {
      sizeCaloriesConditional = "20 Oz.";
    }

    return (
      <div className="item-card" key={item.name}>
        <img src={item.imgLink} alt={item.name} />

        <div className="card-middle-container">
          <h2>{item.name}</h2>
          <h3 className="size-calories">
            {sizeCaloriesConditional} - {item.mediumCalories} Cal
          </h3>
          <div className="loved-icon">
            <IconContext.Provider value={{ className: "heart-icon" }}>
              <AiFillHeart />
            </IconContext.Provider>
            Loved
          </div>
        </div>

        <div className="card-right-container">
          <h3>${item.cost}</h3>

          <button
            className="add-to-cart-button"
            onClick={() => slideModifier(true, item)}
          >
            <IconContext.Provider value={{ className: "plus-icon" }}>
              <HiOutlinePlus />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    );
  });

  //   Pulls out item modifier
  const slideModifier = (slide, item) => {
    setModifierSlider(slide);

    // Destructure selected item object
    const {
      name,
      description,
      category,
      cost,
      smallCost,
      mediumCost,
      largeCost,
      smallCalories,
      mediumCalories,
      largeCalories,
      imgLink,
    } = item;

    // Set the state to the values
    setSelectedItem({
      name,
      description,
      category,
      cost,
      smallCost,
      mediumCost,
      largeCost,
      smallCalories,
      mediumCalories,
      largeCalories,
      imgLink,
    });

    setCurrentCost(cost);
    setTotalCost(cost);
    setCounter(1);

    if (category === "pizza") {
      setSize("medium");
    } else if (category === "wings") {
      setSize("small");
    }
  };

  // adjusts count of item and the price respectively
  const addCounter = () => {
    if (counter < 9) {
      setCounter(counter + 1);

      let roundedCost = ((counter + 1) * currentCost).toFixed(2);
      setTotalCost(roundedCost);
    }
  };
  const minusCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);

      let roundedCost = ((counter - 1) * currentCost).toFixed(2);
      setTotalCost(roundedCost);
    }
  };
  // Sets the current size of user selection and calculates new cost
  const setSizeCurrentCost = (size) => {
    setSize(size);
    if (size === "small") {
      setCurrentCost(selectedItem.smallCost);
      let roundedCost = (counter * selectedItem.smallCost).toFixed(2);
      setTotalCost(roundedCost);
    } else if (size === "medium") {
      setCurrentCost(selectedItem.mediumCost);
      let roundedCost = (counter * selectedItem.mediumCost).toFixed(2);
      setTotalCost(roundedCost);
    } else {
      setCurrentCost(selectedItem.largeCost);
      let roundedCost = (counter * selectedItem.largeCost).toFixed(2);
      setTotalCost(roundedCost);
    }
  };

  // Sends the item to the cart
  const sendItemOrder = (name, link) => {
    const payload = {
      name,
      link,
      counter,
      size,
      currentCost,
      totalCost: parseFloat(totalCost),
    };

    addItem(payload);
    showAlert(`${name} added!`);
    setModifierSlider(false);
  };

  const pizzaSizeButtons = (
    <div className="size-container">
      <div
        className={`size-button ${size === "small" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("small")}
      >
        Small
      </div>
      <div
        className={`size-button ${size === "medium" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("medium")}
      >
        Medium
      </div>
      <div
        className={`size-button ${size === "large" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("large")}
      >
        Large
      </div>
    </div>
  );

  const wingsSizeButtons = (
    <div className="size-container">
      <div
        className={`size-button ${size === "small" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("small")}
      >
        10 Pieces
      </div>
      <div
        className={`size-button ${size === "medium" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("medium")}
      >
        20 Pieces
      </div>
      <div
        className={`size-button ${size === "large" && "selected-size"}`}
        onClick={() => setSizeCurrentCost("large")}
      >
        30 Pieces
      </div>
    </div>
  );

  const itemModifier = (
    <div className={`item-modifier ${modifierSlider && "modifier-slide-in"}`}>
      <div className="inner">
        <div className="top-container">
          <div className="navigator-icons">
            <div
              className="back-icon-container"
              onClick={() => setModifierSlider(false)}
            >
              <IconContext.Provider value={{ className: "back-icon" }}>
                <IoIosArrowBack />
              </IconContext.Provider>
            </div>
            <div className="modify-icon" onClick={() => setAddOnsSlider(true)}>
              <span className="span-1"></span>
              <span></span>
            </div>
          </div>

          <div className="img-container">
            <img src={selectedItem.imgLink} alt={selectedItem.name} />
          </div>

          <h2>
            {selectedItem.name} {selectedItem.category === "pizza" && "Pizza"}
          </h2>

          <div className="counter-price-container">
            <div className="counter">
              <div
                className="minus-icon-container"
                onClick={() => minusCounter()}
              >
                <IconContext.Provider value={{ className: "minus-icon" }}>
                  <FiMinus />
                </IconContext.Provider>
              </div>
              <h3>{counter}</h3>
              <div className="plus-icon-container" onClick={() => addCounter()}>
                <IconContext.Provider value={{ className: "plus-icon" }}>
                  <HiOutlinePlus />
                </IconContext.Provider>
              </div>
            </div>
            <h3>${totalCost}</h3>
          </div>

          <h4>{selectedItem.description}</h4>
        </div>

        <div className="bottom-container">
          {selectedItem.category === "pizza" && pizzaSizeButtons}
          {selectedItem.category === "wings" && wingsSizeButtons}
          {selectedItem.category !== "pizza" &&
          selectedItem.category !== "wings" ? (
            <div className="size-container">
              <div className="one-size-button">One Size</div>
            </div>
          ) : null}
          <div
            className="add-to-cart-button"
            onClick={() => sendItemOrder(selectedItem.name, selectedItem.imgLink)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );

  const pizzaAddOns = (
    <div className={`add-ons-container ${addOnsSlider && "add-ons-slide-in"}`}>
      <div
        className="empty-container"
        onClick={() => setAddOnsSlider(false)}
      ></div>
      <div className="add-ons">
        <div className="back-wrapper">
          <div className="back-icon-container" onClick={() => setAddOnsSlider(false)}>
            <IconContext.Provider value={{ className: "back-icon" }}>
              <IoIosArrowForward />
            </IconContext.Provider>
          </div>
        </div>


      </div>
    </div>
  );

  return (
    <Fragment>
      <ScrollContainer vertical={true} className="menu-container">{filteredMenuItems}</ScrollContainer>
      {itemModifier}
      {pizzaAddOns}
    </Fragment>
  );
};

Menu.propTypes = {
  addItem: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default connect(null, { addItem, showAlert })(Menu);
