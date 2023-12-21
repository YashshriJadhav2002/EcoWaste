import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';

import {useEffect, useState} from 'react'
import '../../../Styles/Login.css';
import {loadStripe} from '@stripe/stripe-js'


const Company_Cart = () => {
  const [session, useSession] = useState(localStorage.getItem("company-token"));

  const [menuVisible, setMenuVisible] = useState(false);
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

  const handleClick1 = () => {
    setMenuVisible(!menuVisible);
  };

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
            <div className="rounded shadow-lg p-4 px-4 md:p-8 mb-6 bg-white flex justify-start items-start border-2">
              <div className="flex flex-col jusitfy-start items-start">
                <div>
                  <p className="text-md leading-4 text-gray-800 dark:text-white">Cart Items</p>
                </div>
                <div className="mt-3">
                  <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Product List</h1>
                </div>
                <div className="mt-4">
                  <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{product.length} {product.length > 1 ? "items" : "item"}</p>
                </div>
                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                  {product.map((p) => (
                    <div className="flex flex-col" key={p._id}>
                      <div className="relative">
                        <img style={{ height: "52vh",width:"50vw" }}  src={p.Avatar} alt={p.Name} />
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex justify-center items-center">
                          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{p.Name}</p>
                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            aria-label="show menu"
                            onClick={handleClick1}
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200"
                          >
                            <svg
                              id="chevronUp1"
                              className={menuVisible ? "hidden" : "fill-stroke"}
                              width="10"
                              height="6"
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg
                              id="chevronDown1"
                              className={menuVisible ? "fill-stroke" : "hidden"}
                              width="10"
                              height="6"
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div id="menu1" className={`flex flex-col jusitfy-start items-start mt-12 ${menuVisible ? '' : 'hidden'}`}>
                        <div>
                          <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">MK617</p>
                        </div>
                        <div className="mt-2">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.Name}</p>
                        </div>
                        <div className="mt-6">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.SellingPrice}</p>
                        </div>
                        <div className="mt-6">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.selling_date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-8 flex justify-between">
                  <div></div>
                  <button   style={{ backgroundColor: 'black' }} className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white tracking-tight py-3 px-4 text-lg leading-4 hover:bg-black border border-red-500 dark:hover:bg-red-700 dark:hover:text-white rounded-md ml-auto" onClick={()=>handleBuy()}>Buy Products</button>
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