import React from 'react'
import '../../../src/Styles/Home.css'
import Navbar from './Navbar';

const Home = () => {
  
    return (
      <div className='mainpage' >
        <div className='navbar'>       
         <Navbar></Navbar>
        </div>
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
            EcoWasteXchange
            </h1>
            <p className="primary-text">
            "Don't trash it, recycle your e-waste and make a difference!"
            </p>
          </div>
          <div className='home-image-section'></div>
           
        </div>
     </div>
    
  );
};

export default Home;
