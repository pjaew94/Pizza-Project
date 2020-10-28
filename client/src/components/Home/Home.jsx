import React from "react";

import "./Home.scss";

import ButtonSimple from '../ButtonSimple/ButtonSimple';

const Home = () => {
  return (
    <div data-testid='home' className="home-container">
    <div className='inner'>
      <h1 data-testid="home-title"><span>Award winning</span> pizza right to your <span>door step!</span></h1>
      <img data-testid='home-pizza' src='https://jwppizza.s3.amazonaws.com/Home+Pizza.png' alt='good lookin pizza'></img>
      <ButtonSimple route='location' textContent='Get Started' />
      </div>
    </div>
  );
};

export default Home;
