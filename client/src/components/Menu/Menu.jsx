import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

import "./Menu.scss";

const Menu = ({ filteredMenu }) => {
  // Counts the quantity the user selected
  const [counter, setCounter] = useState(1);
  // Current cost. (This will not be the one being displayed. it's used to calculate)
  const [currentCost, setCurrentCost] = useState()
  // Keeps costs updated on the modifier ( This will be the one being displayed)
  const [totalCost, setTotalCost] = useState();
  // Stores the item info for the selected item in the modifier
  const [selectedItem, setSelectedItem] = useState({});
  // Slides modifier in and out
  const [modifierSlider, setModifierSlider] = useState(false);
  // Current size of item
  const [size, setSize] = useState();

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
        <img src={item.imgLink} alt="item image" />

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
  
    if (category === "Pizza") {
      setSize("Medium");
    } else if (category === "Wings") {
      setSize("10 Pieces");
    } else {
      setSize("One Size");
    }
  };

  const addCounter = () => {
    if(counter < 9 ) {
      setCounter(counter + 1)
      setTotalCost(counter * currentCost)
    }

    
  }

  const minusCounter = () => {
    if(counter > 1) {
      setCounter(counter - 1)
      setTotalCost(counter * currentCost)
    }

    
  }

  const itemModifier = (
    <div className={`item-modifier ${modifierSlider && "modifier-slide-in"}`}>
      <div className="inner">
        <div className="navigator-icons">
          <div
            className="back-icon-container"
            onClick={() => setModifierSlider(false)}
          >
            <IconContext.Provider value={{ className: "back-icon" }}>
              <IoIosArrowBack />
            </IconContext.Provider>
          </div>
          <div className="modify-icon">
            <span className="span-1"></span>
            <span></span>
          </div>
        </div>

        <div className="img-container">
          <img src={selectedItem.imgLink} alt="item image" />
        </div>

        <h2>
          {selectedItem.name} {selectedItem.category === "pizza" && "Pizza"}
        </h2>

        <div className="counter-price-container">
          <div className="counter">
            <div className="minus-icon-container" onClick={() => minusCounter()}>
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
    </div>
  );

  return (
    <Fragment>
      <div className="menu-container">{filteredMenuItems}</div>
      {itemModifier}
    </Fragment>
  );
};

export default Menu;
