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
          <div className='home-image-section'>
          
            {/* <img class="img-absolute1" src="https://img.freepik.com/free-photo/abstract-blur-empty-green-gradient-studio-well-use-as-background-website-template-frame-business-report_1258-54628.jpg" alt="City 1" /> */}
            {/* <img class="img-absolute" src="https://wallpapers.com/images/hd/green-color-background-rjcb20gvutpekeyn.jpg" alt="City 1" /> */}
          </div>
           
        </div>
     </div>
    
  );
};

export default Home;
