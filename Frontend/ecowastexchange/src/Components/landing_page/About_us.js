import React from 'react';
import '../../../src/Styles/AboutUs.css'
import AboutUs from '../../../src/Images/about_us.png';
import Navbar from './Navbar';


    const InfoContainer = () => 
    {
    
  return (
    
    <div >
       <Navbar></Navbar>
      <h1 className='aboutus-heading' style={{color: "black"}}>About Us</h1><br></br>
      <div className="aboutus-underline"></div>
         <img src={AboutUs} className='aboutusimage' alt="" />
         
         <div className="info-container">
      <p>
      "EchoWasteXchange is  a platform that facilitates a unique marketplace where <br></br>sellers can list their products for sale, and vendors have the opportunity to <br></br> purchase these items.
       Additionally, vendors can further contribute to sustainability <br></br> by offering repair, refurbishment, and repurposing services.<br></br>
        This ecosystem promotes a circular economy, where products are given a second <br></br> life and contribute to reducing waste while creating economic value."
        
      </p>
      </div>
    </div>
  );
}
export default InfoContainer;