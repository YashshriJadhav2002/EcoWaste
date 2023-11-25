import { useEffect, useState } from 'react';
import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';


const VendorProductList = () => {
  
  
  
    const [product, setProductData] = useState([])
    
    useEffect(()=> {
  
      const fetchUser = async() => {
  
  
        let productData = []
        const user_id = localStorage.getItem("product_id")
   
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
  
      return (
        
        <div>
          <Company_Navbar/>
          <Company_Sidebar>
  
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }} >
        {product.map((p)=> (
         
          <div key={p._id} style={{ display: 'flex', backgroundColor: 'rgb(152, 235, 152)', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices'>
            <img src={p.Avatar} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>
  
            <div style={{ fontWeight: 'bold' }}>{p.Name}</div>
            <div style={{ fontWeight: 'bold' }}>{p.SellingPrice}</div>
            <div style={{ fontWeight: 'bold' }}>{p.selling_date}</div>
  
          </div>
          </div>
        ))}
      </div>
  
          </Company_Sidebar>
        </div>
      );
  };
  
  export default VendorProductList;