import React from 'react'
import '../../../Styles/Seller_Exact_Price.css';
import Vendor_Navbar from './Vendor_Navbar';
import { useState ,useEffect} from 'react';
import message from '../../../Images/Messages.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Vendor_Sell_Refurbished() {
  const [session, useSession] = useState(localStorage.getItem("vendor-token"));
 

  const [formData, setFormData] = useState({
    Name: '',
    SellingPrice:'',
    Avatar:'',
  });

  useEffect(()=> {

    const fetchUser = async() => {


      const token = localStorage.getItem("RefurbishedProduct-token")
      
      const res=await fetch('/api/vendor/refurbishedproduct/sell',
      {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json",
        },
        body: JSON.stringify({
          refurbishedproduct_token: token
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


  const handleSell = async () => {


      const token = localStorage.getItem("RefurbishedProduct-token")
   
      const res = await fetch('/api/refurbishedproduct/sell', {method:"POST", headers: {

        'Content-Type' : "application/json",
      },
      body: JSON.stringify({
        refurbishedproduct_token: token
      })
    
      
    
    
    
    
    })

    const data = await res.json()
    if(res.status === 200) {

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
        });

        setTimeout(() => {
          window.location.href = '/VendorHome'
        }, 5000);
    

    }
    else {
      toast.error(data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
        });
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
  return (
    <div>
      {session === null ? 
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
        </div>
       : 
    <div>
        <Vendor_Navbar></Vendor_Navbar>
        <ToastContainer/>
        <div className="container mx-auto p-4 mt-50 flex bg-white p-8 rounded shadow-lg max-w-lg">
        <div className="w-full lg:w-1/2 mx-auto mb-4 ml-4 max-w-lg flex items-center justify-center"> {/* Adjusted max-w-lg */}
            <img className="w-full rounded" src={formData.Avatar} alt={formData.Name} />
        </div>

        <div className="w-full lg:w-1/2 mx-auto p-4 max-w-lg"> 
    <h2 className="text-2xl font-semibold mb-2">{formData.Name}</h2>
    <span className="text-lg font-semibold text-green-600 mb-4">{formData.SellingPrice}</span>
<br></br>
    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-3 ml-0 rounded focus:outline-none" onClick={handleSell}>
      Sell
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

export default Vendor_Sell_Refurbished