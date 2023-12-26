import React from 'react';
import Seller_Sidebar from './Seller_Sidebar';
import Seller_Navbar from './Seller_Navbar';
import '../../../Styles/Login.css';
import {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Seller_History = () => {
  const [session,useSession]=useState(localStorage.getItem("auth-token"))
  const [menuVisible, setMenuVisible] = useState(true);
  const [product, setProductData] = useState([])

  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("auth-token")
 
      const res=await fetch('/api/product/history',
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


          data.data2.forEach((product, index) => {
            const jsonString = JSON.stringify(product);
            const dataparse2=JSON.parse(jsonString)
            productData.push(dataparse2);
            
          });

          setProductData([...product,...productData])
          
        }
       
    }
    
    fetchUser()
    
   
  }, [])

  
  
    
 
  
  const handleDelete = async (productId) => {

      const product_id = productId
      
      const res = await fetch('/api/product/deletehistory',{method: "POST",
    
          headers: {

            'Content-Type':"application/json",


          },
          body:JSON.stringify({
            product_id:product_id
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
      }
      else {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         
          });      }
  }

  const handleClick1 = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <div>
    {
      session===null?<div className="mt-3">
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
  </div>:
    <div>
      <Seller_Navbar/>
      <Seller_Sidebar>
<ToastContainer/>
      <div class="rounded shadow-lg mb-6 bg-white flex justify-start items-start border-2" style={{"padding-left":" 4rem","padding-top": "3rem","paddingBottom":"3rem"}}>
<div className="flex flex-col jusitfy-start items-start">

  <div>
    <p className="text-md leading-4 text-gray-800 dark:text-white">Order History</p>
  </div>
  <div className="mt-3">
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Product List</h1>
  </div>
  <div className="mt-4">
    <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{product.length} {product.length>1?"items":"item"}</p>
  </div>
  <div className="mt-10 lg:mt-12 custom-grid">
  {product.map((p)=> (
     
    <div className="flex flex-col mt-6" key={p._id}>
    
    <div className="relative">
    <img style={{ height: "44vh",width:"350px" }} src={p.Avatar} alt={p.Name} />
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
      <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
  <div className="w-full">
    <button
      className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-3 px-6 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white rounded-md"
      onClick={() => handleDelete(p._id)}
    >
      Delete Product
    </button>
  </div>
</div>
    </div>
  </div>

    ))}
    
  </div>
</div>
</div>  
  </Seller_Sidebar>
  </div>
    }
  </div>
    
  );
          
         
};

export default Seller_History;