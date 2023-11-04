import React from 'react'
import '../../../src/Styles/Home.css'
import BannerImage from '../../../src/Images/home-banner-image.png';
import Navbar from './Navbar';

const Home = () => {
  
    return (
      <div className='mainpage' >
        <Navbar></Navbar>
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
            "Reduce, Reuse, Recycle!"
            </h1>
            <p className="primary-text">
            "Don't trash it, recycle your e-waste and make a difference!"
            </p>
            </div>
            <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
    
  );
};

export default Home;
