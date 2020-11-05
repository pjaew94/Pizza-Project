import React, { useState } from "react";
import { Link } from "react-router-dom";

import './ButtonSimple.scss'

const ButtonSimple = ({ route, textContent }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);



  return (
    <Link
      data-testid="button-simple"
      className={`button-simple ${hovered ? "hovered" : null} ${clicked ? "clicked" : null}`}
      to={`/${route}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    
    >
      {textContent}
    </Link>
  );
};

export default ButtonSimple;
