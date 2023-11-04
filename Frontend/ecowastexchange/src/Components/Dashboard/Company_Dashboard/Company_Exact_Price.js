import React from 'react'
import '../../../Styles/Seller_Exact_Price.css';
import phone from "../../../Images/phone_price.png";
import Company_Navbar from './Company_Navbar';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Company_Exact_Price(props) {


  const [_id, setId] = useState('')

  setId(
    props.id
  )
  const [detail, setDetails] = useState({

    Name:"",
    SellingPrice:"",
    Avatar:""

  }
  )

  useEffect(async ()=> {


    
    const res = await fetch('/api/product/details', {method: "POST", headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({

        _id : _id

    })}
    )

    const data = res.json()

    if(res.status === 200) {

        console.log(data.message)

    }


    
  })

  const [accordionItems, setAccordionItems] = useState([
    { title: 'How did you calculate my device price?', content: 'We evaluate devices on the basis of their condition, age, supply, demand & value in the resale market. All these factors are accounted for by our AI mechanism to determine the best resale value of your device', isOpen: false },
    { title: 'Is it safe to sell my phone on EcoWasteXchange?', content: 'It’s the safest out there. First and foremost, we ensure your device data is erased completely. You will also receive an invoice for the transaction, as a proof of device ownership transfer.', isOpen: false },
    { title: 'Do I need to provide any documents?', content: 'We’ll require copies of your address and identity proof to validate the ownership of device. Additionally, sharing a valid invoice for your device is mandatory if you’re selling in Bengaluru, Mangalore, Noida & Ghaziabad.', isOpen: false },
  ]);

  const toggleAccordionItem = (index) => {
    setAccordionItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: !item.isOpen };
        } else {
          return { ...item, isOpen: false }; // Close other sections when opening one
        }
      });
      return updatedItems;
    });
  };
  return (
    <div>
        <Company_Navbar></Company_Navbar>
    <div className='item-container'>
        <div className='product-image'>
      <img src={phone}></img> 
      </div> 
      <div className='device-name'>
      <h1>Samsung Galaxy A21s (8 GB/128 GB)</h1>
      <h3>Selling Price:</h3>
      <br></br>
      <h1 style={{"color":"red"}}>Rs.500</h1>
      <br></br>
      <button className='sellbutton'>Sell</button>
      
      <br></br>
      <text>Fast <br></br>Payments</text>
      <div className="verticleline">
      </div>
      <div className="textclass">
      <text>100% Safe</text>
      </div>
      </div>
    </div>
    <div className='faq'>
    <h1>FAQ's</h1>
    </div>
    <div className="accordion">
      {accordionItems.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-item-header ${item.isOpen ? 'open' : ''}`}
            onClick={() => toggleAccordionItem(index)}
          >
            {item.title}
            <span className="accordion-item-toggle">{item.isOpen ? '-' : '+'}</span>
          </div>
          {item.isOpen && (
            <div className="accordion-item-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Company_Exact_Price;