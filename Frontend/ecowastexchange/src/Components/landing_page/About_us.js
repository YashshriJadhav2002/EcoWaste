import React from 'react';
import '../../../src/Styles/AboutUs.css'
import AboutUs1 from '../../../src/Images/about-img.png';
import AboutUs2 from '../../../src/Images/img-about2.png';
import seller from '../../../src/Images/seller.jpg';
import Navbar from './Navbar';


const InfoContainer = () => 
{
    
        return (
          
          <div >
            <Navbar></Navbar>

            {/* <h1 className='aboutus-heading' style={{color: "black"}}>About Us</h1><br></br> */}
            {/* <div className="aboutus-underline"></div> */}
              
            


            <img className='img-about1' src={AboutUs1}  alt="" /> 

            <div className='strip-section1'></div>
            <h1 className='line1'>Its all about the idea !</h1>

            <h1 className='line2'>REDUCE, REUSE, RECYCLE</h1>

            <div className="info-container">

                  {/* <p className='line3'>The Earth is what we all have in common !</p> */}
                  <div className='text-part'>


                  <p className='line3'>Yes ! The globe is our world. </p>
                  <p className='line4'>don't just day it, MEAN IT !</p>


                  </div>
                  
                  <img className='img-about2' src={AboutUs2}  alt="" /> 


                  
                  {/* <p>
                  "EchoWasteXchange is  a platform that facilitates a unique marketplace where sellers can list their products for sale, and vendors have the opportunity to purchase these items.
                  Additionally, vendors can further contribute to sustainability by offering repair, refurbishment, and repurposing services.
                  This ecosystem promotes a circular economy, where products are given a second life and contribute to reducing waste while creating economic value."
                    
                  </p> */}

            </div>



            <div className='strip-section2'></div>
            <h1 className='line5'>FOUNDERS</h1>

            <div className='strip-section3'></div>

            <div className='founder-container'>

                  <div className='fcontainer1'>
                      <img className='founder1' src={seller}  alt="" /> 
                      <h2 className='fname1'>Yashshri Jadhav</h2>
                  </div>
                  <div className='fcontainer2'>
                      <img className='founder2' src={seller}  alt="" /> 
                      <h2 className='fname2'>Yashshri Jadhav</h2>

                  </div>
                  <div className='fcontainer3'>
                      <img className='founder3' src={seller}  alt="" /> 
                      <h2 className='fname3'>Yashshri Jadhav</h2>

                  </div>
                  <div className='fcontainer4'>
                      <img className='founder4' src={seller}  alt="" /> 
                      <h2 className='fname4'>Yashshri Jadhav</h2>

                  </div>

            </div>

          </div>
        );
}

export default InfoContainer;