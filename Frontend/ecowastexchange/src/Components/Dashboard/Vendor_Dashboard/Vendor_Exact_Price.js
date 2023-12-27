import React from 'react'
import '../../../Styles/Seller_Exact_Price.css';
import Vendor_Navbar from './Vendor_Navbar';
import { useState ,useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js'
import message from '../../../Images/Messages.png'



function  Vendor_Exact_Price() {
  const [session,useSession]=useState(localStorage.getItem("vendor-token"))

  const [formData, setFormData] = useState({
    Name: '',
    SellingPrice:'',
    Avatar:'',
  });

  useEffect(()=> {

    const fetchUser = async() => {


      const token = localStorage.getItem("product_id")
      
      const res=await fetch('/api/vendor/exactprice',
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

    const auth_token=localStorage.getItem('vendor-token')
    const product_id = localStorage.getItem('product_id')
    const stripe=await loadStripe('pk_test_51OA6VNSBOVYSI6906LeR8tlp1rY2vRPDCGBX8VzqA1mimmrm8dekOrR09S5oq0r9gOsrgA8OW9NpuXp5liGKuoWx002DnlMiyO')
    const res = await fetch('api/vendor/product/buy', {
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        product_id:product_id,
        auth_token:auth_token,
      })
  
  })

  const data = await res.json()
  const result=stripe.redirectToCheckout({
    sessionId:data.id
  });

  if(result.error)
  {
    console.log(result.error)
  }
 



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

  const handleGmail=()=>{
    window.location.href='/vendorChat'
  }
  
  return (
    <div>
      {
        session===null?<div class="mt-3">
      <h1 class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
    </div>:
    <div>
        <Vendor_Navbar></Vendor_Navbar>
         <div className="container mx-auto p-4 mt-50 flex bg-white p-8 rounded shadow-lg max-w-lg mt-10">
         <div className="w-full lg:w-1/2 mx-auto mb-4 ml-4 max-w-lg flex items-center justify-center"> {/* Adjusted max-w-lg */}
            <img className="w-full rounded" src={formData.Avatar} alt={formData.Name} />
        </div>

        <div className="w-full lg:w-1/2 mx-auto p-4 max-w-lg"> 
    <h2 className="text-2xl font-semibold mb-2">{formData.Name}</h2>
    <span className="text-lg font-semibold text-green-600 mb-4">{formData.SellingPrice}</span>
<br></br>
    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-3 ml-0 rounded focus:outline-none" onClick={handleBuy}>
      Buy
    </button>
    
    <button className='gmailbutton' onClick={handleGmail}>
      <img src={message} style={{ "height": "35px", "width": "35px", "marginLeft":"10px","marginTop":"5px"}} alt="Chat" />
    </button>

    <div className="mt-8">
      <text>Fast Payments</text>
    </div>
    
    <div className="verticleline" ></div>
    
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
      }
      </div>
  )
}

export default  Vendor_Exact_Price