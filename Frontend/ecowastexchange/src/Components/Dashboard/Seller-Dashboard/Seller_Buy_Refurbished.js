import React from 'react';
import '../../../Styles/Seller_Buy_Refurbished.css';
import phone from "../../../Images/phone_price.png";
import Seller_Navbar from './Seller_Navbar';

function Buy_Refurbished() {
  return (

    <div>
        <Seller_Navbar></Seller_Navbar>
        
    <div className='buyitem-container'>
        <div className='buyproduct-image'>
      <img src={phone}></img> 
      </div> 
      <div className='buydevice-name'>
      <h1>Samsung Galaxy A21s (8 GB/128 GB)</h1>
      <h3>Selling Price:</h3>
      <br></br>
      <h1 style={{"color":"red"}}>Rs.500</h1>
      <br></br>
      <button className='buybutton'>Buy</button>
      <br></br>
      <text>Fast <br></br>Payments</text>
      <div className="buyverticleline">
      </div>
      <div className="buytextclass">
      <text>100% Safe</text>
      </div>
      </div>
      <div className='defectretrivedtext'>
      <text style={{"font-weight": "bold"}}>Defects Resolved</text>
      <br></br>
      <textarea></textarea>
      </div>
    </div>
    
    </div>
  )
}

export default Buy_Refurbished