import React, { useEffect,useState } from 'react';
import Seller_Sidebar from './Seller_Sidebar';
import Seller_Navbar from './Seller_Navbar';
import '../../../Styles/Seller_Navbar.css';


const Seller_Home = () => {
  const [refurbishedProduct, setrefurbishedProductData] = useState([])
  const [session,useSession]=useState(localStorage.getItem("auth-token"))
  
  useEffect(()=> {

    const fetchUser = async() => {
      let refurbishedProductData = []
      const token = localStorage.getItem("auth-token")
      const res=await fetch('/api/seller/home',
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
          
          data.data.forEach((refurbishedProduct, index) => {
            const jsonString = JSON.stringify(refurbishedProduct);
            const dataparse=JSON.parse(jsonString)
            refurbishedProductData.push(dataparse);
            
          });
         
         
          setrefurbishedProductData([...refurbishedProduct,...refurbishedProductData])
        }
    }
    
    fetchUser()

  }, [])



    return (
      <div>
      {
        session===null?<div class="mt-3">
      <h1 class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
    </div>:<div>
        <Seller_Navbar> </Seller_Navbar>
      <Seller_Sidebar> 
      
      <div class="rounded shadow-lg mb-6 bg-white flex justify-start items-start border-2" style={{"padding-left":" 4rem","padding-top": "3rem","paddingBottom":"3rem"}}>
              <div className="flex flex-col jusitfy-start items-start">
               
                <div className="mt-3">
                  <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Electronic Products</h1>
                </div>
                <div className="mt-4">
                  <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{refurbishedProduct.length} {refurbishedProduct.length > 1 ? "items" : "item"}</p>
                </div>
                <div className="mt-10 lg:mt-12 custom-grid ">
                  {refurbishedProduct.map((p) => (
                    <div className="flex flex-col mt-6 custom-hover-effect px-8 py-5 border-2"  key={p._id} onClick={function() 
                    {
                      localStorage.setItem("refurbishedProduct_id",p._id)
                      window.location.href = '/SellerBuyRefurbished'
                    }
                    }>
                      <div className="relative">
                      <img style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '1vh', marginBottom: '5vh',width:'300px',height:'30vh'}} src={p.Avatar} alt={p.Name} />
                      </div>
                      <div className="mt-6 flex justify-between items-center px-2.5">
                        <div className="flex justify-center items-center">
                          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{p.Name}</p>
                        </div>
                        <div className="mt-6">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{p.SellingPrice}</p>
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

export default Seller_Home;