import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"
import {useEffect, useState} from 'react'
import '../../../Styles/Seller_Navbar.css';

const Company_Cart = () => {
  
     
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

    return (
      
      <div>
        <Company_Navbar/>
        <Company_Sidebar>
<<<<<<< HEAD
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }}>
  {photosData.map(photo => (
    <div key={photo.id} style={{ display: 'flex', backgroundColor: '#00a49c', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices' onClick={() => window.location.href = '/BuyRefurbished'}>
      <img src={photo.src} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>
        <span style={{ fontWeight: 'bold' }}>{photo.name}</span>
        <span style={{ fontWeight: 'bold' }}>{photo.name1}</span>
      </div>
=======

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
>>>>>>> 0c88d10a64e5ab3c8219d64ce0cd5daff67cb558
    </div>

        </Company_Sidebar>
      </div>
    );
};


export default Company_Cart;