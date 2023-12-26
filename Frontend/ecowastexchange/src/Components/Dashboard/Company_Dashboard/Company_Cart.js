import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';

import {useEffect, useState} from 'react'
import '../../../Styles/Login.css';
import {loadStripe} from '@stripe/stripe-js'


const Company_Cart = () => {
  const [session, useSession] = useState(localStorage.getItem("company-token"));

  const [product, setProductData] = useState([])
  
  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("company-token")
 
      const res=await fetch('/api/company/cart',
      {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json",
        },
        body: JSON.stringify({
          auth_token: token
        })
      })

        const data=await res.json()
        if(res.status===200)
        {
          
          data.data.forEach((product, index) => {
            const jsonString = JSON.stringify(product);
            const dataparse=JSON.parse(jsonString)
         
            productData.push(dataparse);
            
          });
         
         
          setProductData([...product,...productData])
        }
    }
    
    fetchUser()

  }, [])

  const totalSellingPrice = product.reduce((total, p) => total + p.SellingPrice, 0);
  const shipping=80.00;
  const totalCost = totalSellingPrice + shipping;


  const handleBuy = async() => {


    const stripe=await loadStripe('pk_test_51OA6VNSBOVYSI6906LeR8tlp1rY2vRPDCGBX8VzqA1mimmrm8dekOrR09S5oq0r9gOsrgA8OW9NpuXp5liGKuoWx002DnlMiyO')
    const res = await fetch('/api/buy/product/list', {
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
      product:product
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

    return (
      
      <div>
      {session === null ? (
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
        </div>
      ) : (
        <div>
          <Company_Navbar />
          <Company_Sidebar>
          <div className="bg-gray-100">
  <div className="container mx-auto mt-10 ">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10 border-2">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{product.length} {product.length>1?"Items":"Item"}</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-black-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-black-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 className="font-semibold text-center text-black-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 className="font-semibold text-center text-black-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        {product.map((p)=> (
          
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" id={p._id}>
          <div className="flex w-2/5"> 
            <div className="w-20">
              <img className="h-24" src={p.Avatar} alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{p.Name}</span>
              <span className="text-red-500 text-xs">{p.Name}</span>
             
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <input className="mx-2 border text-center w-8" type="text" value="1"/>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{"Rs." + p.SellingPrice}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{"Rs "+ p.SellingPrice}</span>
        </div>

          

        ))}
      </div>

      <div id="summary" className="w-1/4 px-8 py-10 bg-gray-400" >
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">{product.length>0?"Items":"Item"} {product.length}</span>
          <span className="font-semibold text-sm">{`Rs ${totalSellingPrice}`}</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - {`Rs ${shipping}`}</option>
          </select>
        </div>
        
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>{`Rs ${totalCost}`}</span>
          </div>
          <button className="bg-black font-semibold hover:bg-black-600 py-3 text-sm text-white uppercase w-full" onClick={()=>handleBuy()}>Checkout</button>
        </div>
      </div>

    </div>
  </div>
</div>

          
          </Company_Sidebar>
        </div>
      )}
    </div>
    );
};

export default Company_Cart;