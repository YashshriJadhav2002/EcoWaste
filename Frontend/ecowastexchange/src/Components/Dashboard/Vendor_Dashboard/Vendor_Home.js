import React, { useEffect,useState } from 'react';
import Vendor_Sidebar from './Vendor_Sidebar';
import Vendor_Navbar from './Vendor_Navbar';
import '../../../Styles/Seller_Navbar.css';

const  Vendor_Home = () => {
  const [product, setProductData] = useState([])
  const [session,useSession]=useState(localStorage.getItem("vendor-token"))

  useEffect(()=> {

    const fetchUser = async() => {
      let productData = []
      const token = localStorage.getItem("vendor-token")
 
      const res=await fetch('/api/vendor/home',
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
      {
        session===null?<div className="mt-3">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
    </div>:
      <div>
       <Vendor_Navbar></Vendor_Navbar>
      <Vendor_Sidebar>
      <div class="rounded shadow-lg mb-6 bg-white flex justify-start items-start border-2" style={{"padding-left":" 4rem","padding-top": "3rem","paddingBottom":"3rem"}}>
              <div className="flex flex-col jusitfy-start items-start">
               
                <div className="mt-3">
                  <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Electronic Products</h1>
                </div>
                <div className="mt-4">
                  <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{product.length} {product.length > 1 ? "items" : "item"}</p>
                </div>
                <div className="mt-10 lg:mt-12 custom-grid ">
                  {product.map((p) => (
                    <div className="flex flex-col mt-6 custom-hover-effect px-8 py-5 border-2"  key={p._id} onClick={function() 
                    {
                      localStorage.setItem("product_id",p._id)
                      window.location.href = '/VendorExactPrice'
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
      </Vendor_Sidebar>
    </div>
      }
      </div>
    );
};

export default  Vendor_Home;