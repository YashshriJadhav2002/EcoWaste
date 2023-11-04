import React from 'react';
import '../../../src/Styles/Vision.css'
import vision from '../../../src/Images/Vision.png';
import Navbar from './Navbar';


    const InfoContainer = () => 
    { 

   return (
    
    <div >
       <Navbar></Navbar>
         <img src={vision} className='visionimage' alt="" />
         <div className="vision-container">
      <h1 style={{color: "green"}}>Vision</h1><br></br>
      <p>
      "EchoWasteXchange envisions a world where sustainability is at the forefront, empowering sellers to contribute to a circular economy by offering their 
      products for <br></br> sale. Vendors play a vital role by acquiring these items and then channeling them <br></br> toward 
      companies that specialize  repair, refurbishment, and repurposing.
       Together, <br></br>we strive to create a future where waste is minimized,
       and products are given a second <br></br> life, preserving our planet's resources and fostering economic growth."
      </p>
      </div>
    </div>
  );
}
export default InfoContainer;