import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"
import {useEffect, useState} from 'react'
import '../../../Styles/Seller_Navbar.css';
import {loadStripe} from '@stripe/stripe-js'


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
        <Company_Navbar/>
        <Company_Sidebar>
        <div><h2>My Cart</h2></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }} >
      {product.map((p)=> (
       
        <div key={p._id} style={{ display: 'flex', backgroundColor: '#00a49c', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices'>
          <img src={p.Avatar} style={{ maxWidth: '30vh', height: '30vh', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>

          <div style={{ fontWeight: 'bold' }}>{p.Name}</div>
          <div style={{ fontWeight: 'bold' }}>{p.SellingPrice}</div>
          <div style={{ fontWeight: 'bold' }}>{p.selling_date}</div>

        </div>
        </div>
      ))}

      <div className='sellbutton' onClick={handleBuy}>Buy Products</div>
    </div>

        </Company_Sidebar>
      </div>
    );
};


export default Company_Cart;