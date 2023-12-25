import React from 'react'
import '../../../Styles/Seller_Exact_Price.css';
import Seller_Navbar from './Seller_Navbar';
import { useState,useEffect } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Exact_Price() {
  const [session,useSession]=useState(localStorage.getItem("auth-token"))

  const [formData, setFormData] = useState({
    Name: '',
    SellingPrice:'',
    Avatar:'',
  });

  useEffect(()=> {

    const fetchUser = async() => {


      const token = localStorage.getItem("product-token")
     
      const res=await fetch('/api/product/exactPrice',
      {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json",
        },
        body: JSON.stringify({
          product_token: token
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


      const token = localStorage.getItem("product-token")
   
      const res = await fetch('/api/product/sell', {
        method:"POST", headers: {

        'Content-Type' : "application/json",
      },
      body: JSON.stringify({
        product_token: token
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
          window.location.href = '/SellerHome'
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
       
        });    }

  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    setUserInput(formData.SellingPrice);

  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("product-token")
    const SellingPrice = userInput;
    
    
    const res=await fetch('/api/seller/sellerSellingPrice',{
      method:"POST",
      headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      product_token:token,
      SellingPrice,
    })
  })

  const data= await res.json();

  if(res.status===200)
  toast.success(data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
   
    });
      else
  toast.error(data.error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
   
    });  
    
    closeModal();

    setFormData({ ...formData, SellingPrice });

  }; 

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
      {
        session===null?<div class="mt-3">
      <h1 class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
    </div>:
    <div>
        <Seller_Navbar></Seller_Navbar>
        <ToastContainer/>
        <div className="container mx-auto p-4 mt-50 flex bg-white p-8 rounded shadow-lg max-w-md">
        <div className="w-full lg:w-1/5 mx-auto mb-4 ml-4 max-w-xs">
            <img className="w-full rounded" src={formData.Avatar} alt={formData.Name} />
        </div>

  <div className="w-full lg:w-2/3 mx-auto p-4">
    <h2 className="text-2xl font-semibold mb-2">{formData.Name}</h2>
    <span className="text-lg font-semibold text-green-600 mb-4">{formData.SellingPrice}</span>
<br></br>
<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-0 focus:outline-none mt-5" onClick={openModal}>Edit</button>
        <br></br>
      <button   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-5 ml-0 rounded focus:outline-none" onClick={handleSell}>Sell</button>
      <br></br>
  
    <div className="mt-8">
      <text>Fast Payments</text>
    </div>
    
    <div className="verticleline" ></div>
    
    <div className="textclass">
      <text>100% Safe</text>
    </div>
  </div>

      
     

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Input Modal"
  className="centered-modal"
>
  <div className="modal-container bg-white p-8 rounded shadow-lg max-w-md mx-auto">
    <h2 className="text-2xl font-semibold mb-4 text-center">Enter Selling Price:</h2>
    
    <form className="flex flex-col items-center">
      <input
        type="text"
        className="inputtext mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter Selling Price"
      />
       <div className="flex">
      <button
        type="submit"
        className="editsubmitbutton bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
        onClick={handleFormSubmit}
      >
        Submit
      </button>
      
      <button
        className="editcancelbutton bg-black-500 hover:bg-black-600 text-white px-4 py-2 mt-5 rounded focus:outline-none"
        onClick={closeModal}
      >
        Cancel
      </button>
      </div>
    </form>
  </div>
</Modal>
      
      
      
     
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

export default Exact_Price;