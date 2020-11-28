import React from "react";
import { IconContext } from "react-icons";

import { HiOutlineTrash } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";

import "./DeleteConfirm.scss";
const DeleteConfirm = ({ setDisplay, deleteItem, itemName, display }) => {



  return (
    <div className={`delete-confirm-container ${display && "show"}`}>
      <div className='delete-confirm-inner'>
        <h3>Are you sure you want to remove {itemName}?</h3>
        <div className="buttons-container">
          <div className="delete-item-button" onClick={()=> deleteItem()}>
            <IconContext.Provider value={{ className: "delete-icon" }}>

                <HiOutlineTrash />

            </IconContext.Provider>
            <h4>Yes</h4>
          </div>
          <div className="back-button" onClick={() => setDisplay(false)}>
            <IconContext.Provider value={{ className: "close-icon" }}>
     
                <VscClose />
    
            </IconContext.Provider>
            <h4>No</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
