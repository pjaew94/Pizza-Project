import React from "react";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <h1 data-testid="home-title">Award winning pizza right to your door step!</h1>
      <img data-testid='home-pizza' src='https://jwppizza.s3.amazonaws.com/Home+Pizza.png' alt='good lookin pizza'></img>
    </div>
  );
};

export default Home;
