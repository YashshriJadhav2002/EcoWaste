import { useEffect, useState } from 'react';
import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorProductList = () => {
  const [session,useSession]=useState(localStorage.getItem("company-token"))

    const [product, setProductData] = useState([])
    
    useEffect(()=> {
  
      const fetchUser = async() => {
  
  
        let productData = []
        const user_id = localStorage.getItem("vendor_id")
   
        const res=await fetch('/api/vendor/productlist',
        {
          method:"POST",
          headers:
          {
          "Content-Type":"application/json",
          },
          body: JSON.stringify({
            user_id
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

    const handleCart = async() => {

      const product_id = localStorage.getItem('product_id')
      const auth_token = localStorage.getItem('company-token')
      const res = await fetch('/api/company/addtocart', {
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          product_id:product_id,
          auth_token : auth_token
        })
    
    })
  
    const data = await res.json()
    if(res.status === 200) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
        });
  
    }else {
  
      toast.error(data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
        });  
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
          <ToastContainer/>
          <div class="rounded shadow-lg mb-6 bg-white flex justify-start items-start border-2" style={{"padding-left":" 4rem","padding-top": "3rem","paddingBottom":"3rem"}}>
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
                  {
                    product.map((p) => (
                    <div className="flex flex-col mt-6" key={p._id} onClick={function() 
                      {
                        localStorage.setItem("product_id",p._id)
                        handleCart()
                      }
                      }>
                      <div className="relative">
                        <img style={{ height: "45vh",width:"20vw" }}  src={p.Avatar} alt={p.Name} />
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex justify-center items-center">
                          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{p.Name}</p>
                        </div>
                        
                      </div>
                      <div id="menu1" className={`flex flex-col jusitfy-start items-start mt-12 `}>
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
                  
                </div>
                
              </div>
             
            </div>
          </Company_Sidebar>
        </div>
      )}
    </div>
    );
  };
  
  export default VendorProductList;

  // onClick={function() 
  // {
  //   localStorage.setItem("product_id",p._id)
  //   handleCart()
  // }
  // }