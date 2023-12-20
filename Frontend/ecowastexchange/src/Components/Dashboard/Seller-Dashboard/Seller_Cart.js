import React from 'react';
import Seller_Sidebar from './Seller_Sidebar';
import Seller_Navbar from './Seller_Navbar';
import '../../../Styles/Login.css';
import {useEffect, useState} from 'react'

const Seller_Cart = () => {
  
  
  
  const [product, setProductData] = useState([])
  
  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("auth-token")
 
      const res=await fetch('/api/product/cart',
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

    return (
      
      <div>
        <Seller_Navbar/>
        <Seller_Sidebar>

  <div class="rounded shadow-lg p-4 px-4 md:p-8 mb-6 bg-white flex justify-start items-start border-2">
  <div class="flex flex-col jusitfy-start items-start">
  
    <div>
      <p class="text-md leading-4 text-gray-800 dark:text-white">Cart Items</p>
    </div>
    <div class="mt-3">
      <h1 class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Product List</h1>
    </div>
    <div class="mt-4">
      <p class="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{product.length} {product.length>1?"items":"item"}</p>
    </div>
    <div class="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
    {product.map((p)=> (
       
      <div class="flex flex-col" key={p._id}>
      
      <div class="relative">
        <img class="hidden lg:block" src={p.Avatar} alt={p.Name} />
      </div>
      <div class="mt-6 flex justify-between items-center">
        <div class="flex justify-center items-center">
          <p class="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{p.Name}</p>
        </div> 
      </div>
      <div id="menu1" class="flex flex-col jusitfy-start items-start mt-12">
        <div>
          <p class="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">MK617</p>
        </div>
        <div class="mt-2">
          <p class="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.Name}</p>
        </div>
        <div class="mt-6">
          <p class="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.SellingPrice}</p>
        </div>
        <div class="mt-6">
          <p class="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.selling_date}</p>
        </div>
        
      </div>
    </div>

      ))}
      
    </div>
  </div>
</div>
        
        

        
    </Seller_Sidebar>
    </div>
    );
};

export default Seller_Cart;