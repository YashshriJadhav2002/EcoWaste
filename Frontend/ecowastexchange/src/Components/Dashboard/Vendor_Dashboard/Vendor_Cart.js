import React from 'react';
import {useEffect, useState} from 'react'
import Vendor_Sidebar from './Vendor_Sidebar';
import Vendor_Navbar from './Vendor_Navbar';
import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"
import '../../../Styles/Seller_Navbar.css';

const  Vendor_Cart = () => {
  

  const [product, setProductData] = useState([])
  
  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("vendor-token")
 
      const res=await fetch('/api/vendor/cart',
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
        <Vendor_Navbar/>
        <Vendor_Sidebar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }} >
      {product.map((p)=> (
       
        <div key={p._id} style={{ display: 'flex', backgroundColor: '#00a49c', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices'>
          <img src={p.Avatar} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>

          <div style={{ fontWeight: 'bold' }}>{p.Name}</div>
          <div style={{ fontWeight: 'bold' }}>{p.SellingPrice}</div>
          <div style={{ fontWeight: 'bold' }}>{p.selling_date}</div>

        </div>
        </div>
      ))}
    </div>

        </Vendor_Sidebar>
      </div>
    );
};

export default  Vendor_Cart;