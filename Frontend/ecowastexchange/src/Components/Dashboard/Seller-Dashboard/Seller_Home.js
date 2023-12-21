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
      
      <div><h2 className='head'>Refurbished Products </h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }} >
      {refurbishedProduct.map(refurbishedProduct => (
        <div key={refurbishedProduct._id} style={{ backgroundColor: '#fff', border: '0.1vh solid #ddd', padding: '5vh', textAlign: 'center' }} className='devices' onClick={function() 
        {
          localStorage.setItem("refurbishedProduct_id",refurbishedProduct._id)
          localStorage.setItem("vendor-id",refurbishedProduct.user_id)
          window.location.href = '/SellerBuyRefurbished'
        }
        }>
        <img src={refurbishedProduct.Avatar} alt={refurbishedProduct.Name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ fontWeight: 'bold' }}>{refurbishedProduct.Name}</div>
          <div style={{ fontWeight: 'bold' }}>{refurbishedProduct.SellingPrice}</div>
  

        </div>
      ))}
    </div>
      
      </Seller_Sidebar>
        </div>
      }
       
    </div>
    );
};

export default Seller_Home;