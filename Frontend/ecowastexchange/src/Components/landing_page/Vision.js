import React from 'react';
import '../../../src/Styles/Vision.css'
// import vision from '../../../src/Images/Vision.png';
import Navbar from './Navbar';


    const InfoContainer = () => 
    { 

   return (
    
    <div >
       <Navbar></Navbar>

        <div className='strip1'></div>

        <div className="vision-container1">

                      
                <p className='vision-info1'>
                "we strive to create a future where waste is minimized,
                and products are given a second  life, preserving our planet's resources and fostering economic growth."
                </p>
                           
                <img class="img-vision1" src="https://t3.ftcdn.net/jpg/03/06/27/38/240_F_306273830_UKRxsvd19Tjwq4ULQl9V6oyRa6Dy7JlS.jpg" alt="City 1" />

        </div>

        <div className="vision-container2">

                <img class="img-vision2" src="https://t4.ftcdn.net/jpg/06/29/70/07/240_F_629700703_UvkrrDfRep5HXRx1LIlEPVvRrvNd6IwE.jpg" alt="City 1" />
 
                <p className='vision-info2'>
                "EchoWasteXchange envisions a world where sustainability is at the forefront, empowering sellers to contribute to a circular economy by offering their products for  sale."
                </p>
                           

        </div>

        <div className='strip2'></div>

        <div className="vision-container3">


                <p className='vision-info3'>
                "Vendors play a vital role by acquiring these items and then channeling them  toward companies that specialize  repair, refurbishment, and repurposing."
                </p>

                <img class="img-vision3" src="https://t4.ftcdn.net/jpg/06/29/70/07/240_F_629700703_UvkrrDfRep5HXRx1LIlEPVvRrvNd6IwE.jpg" alt="City 1" />

           

        </div>



    </div>
  );
}
// EchoWasteXchange envisions a world where sustainability is at the forefront, empowering sellers to contribute to a circular economy by offering their 
// products for  sale. Vendors play a vital role by acquiring these items and then channeling them  toward 
// companies that specialize  repair, refurbishment, and repurposing. 
export default InfoContainer;