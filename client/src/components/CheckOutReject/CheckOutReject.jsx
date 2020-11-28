import React from "react";
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";

import './CheckOutReject.scss'

export default function CheckOutReject({ setShowReject, showReject }) {
  return (
    <div
      className={`check-out-reject-container ${
        showReject && "display-rejection"
      }`}
    >
      <div className="rejection-inner">
        <div className="close-button" onClick={() => setShowReject(false)}>
          <IconContext.Provider value={{ className: "close-icon" }}>
            <IoIosClose />
          </IconContext.Provider>
        </div>
        <div className='oops'>Oops!</div>
        <div className='rejection-msg'>All orders must be greater than $15.00!</div>
      </div>
    </div>
  );
}
