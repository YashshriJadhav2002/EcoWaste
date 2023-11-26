import React from 'react';
import '../../../Styles/Seller_Buy_Refurbished.css';
import phone from "../../../Images/phone_price.png";
import { useState ,useEffect} from 'react';
import Seller_Navbar from './Seller_Navbar';

function Buy_Refurbished() {

  
  const [formData, setFormData] = useState({
    Name: '',
    SellingPrice:'',
    Avatar:'',
  });

  useEffect(()=> {

    const fetchUser = async() => {


      const token = localStorage.getItem("refurbishedProduct_id")
      
      const res=await fetch('/api/seller/exactprice',
      {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json",
        },
        body: JSON.stringify({
        product_id: token
        })
      })

        const data=await res.json()
        console.log(data)
       
        if(res.status===200)
        {
          
          setFormData({

              Name: data.data.Name,
              SellingPrice: data.data.SellingPrice,
              Avatar: data.data.Avatar,


          })


        }
    }
    
    fetchUser()

  }, [])


  const [accordionItems, setAccordionItems] = useState([
    { title: 'How did you calculate my device price?', content: 'We evaluate devices on the basis of their condition, age, supply, demand & value in the resale market. All these factors are accounted for by our AI mechanism to determine the best resale value of your device', isOpen: false },
    { title: 'Is it safe to sell my phone on EcoWasteXchange?', content: 'It’s the safest out there. First and foremost, we ensure your device data is erased completely. You will also receive an invoice for the transaction, as a proof of device ownership transfer.', isOpen: false },
    { title: 'Do I need to provide any documents?', content: 'We’ll require copies of your address and identity proof to validate the ownership of device. Additionally, sharing a valid invoice for your device is mandatory if you’re selling in Bengaluru, Mangalore, Noida & Ghaziabad.', isOpen: false },
  ]);


  const handleBuy = async() => {

    const product_id = localStorage.getItem('refurbishedProduct_id')
    const auth_token = localStorage.getItem('auth-token')
    const res = await fetch('/api/seller/product/buy', {
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        product_id:product_id,
        auth_token:auth_token
      })
  
  })

  const data = await res.json()
  if(res.status === 200) {
    window.alert(data.message)
    window.location.href = '/SellerHome'

  }else {

    window.alert(data.error)

  }
      
  }

  const handleCall=()=>{
    window.location.href = '/call/vendor'
  }

  const handleGmail=()=>{
    window.location.href = '/message/vendor'


  }

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
        <Seller_Navbar></Seller_Navbar>
    <div className='item-container'>
        <div className='product-image'>
      <img src={formData.Avatar}></img> 
      </div> 
      <div className='device-name'>
      <h1>{formData.Name}</h1>
      <h3>Selling Price:</h3>
      <br></br>
      <h1 style={{"color":"red"}}>{formData.SellingPrice}</h1>
      <br></br>
      <button className='sellbutton' onClick={handleBuy}>Buy</button>
      <button className='callbutton' onClick={handleCall}>Connect through Call with vendor</button>
      <button className='gmailbutton' onClick={handleGmail}>Connect through Gmail</button>
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

export default Buy_Refurbished