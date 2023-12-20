import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import {useEffect, useState} from 'react'
import Company_Navbar from './Company_Navbar';

import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"
import '../../../Styles/Seller_Navbar.css';


const Company_History = () => {
  
  const [product, setProductData] = useState([])

   
  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("company-token")
 
      const res=await fetch('/api/company/history',
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


  const handleDelete = async (productId) => {

    const product_id = productId
    alert(product_id)

    const res = await fetch('/api/company/deletehistory',{
      method: "POST",
  
        headers: {

          'Content-Type':"application/json",


        },
        body:JSON.stringify({
          product_id:product_id
        })
  
      
    })

    const data = await res.json()
    if(res.status === 200) {
      window.alert(data.message)

    }
    else {
      window.alert(data.error);
    }
}

const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

    return (
      <div>
      <Company_Navbar/>
      <Company_Sidebar>
      <div>
      <label>Select an option:</label>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="productByVendor">Product bought by vendor</option>
        <option value="productByCompany">Product bought by company</option>
        <option value="sellerRefurbished">Seller bought refurbished product</option>
      </select>

      {selectedOption && (
        <p>You selected: {selectedOption}</p>

      )}
    </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }} >
      {product.map((p) => (
        <div key={p._id} style={{ display: 'flex', backgroundColor: '#00a49c', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices'>
          <img src={p.Avatar} alt={p.Name} style={{ maxWidth: '30vh', height: '30vh', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>
          <span style={{ fontWeight: 'bold' }}>{p.Name}</span>
          <span style={{ fontWeight: 'bold' }}>{p.SellingPrice}</span>
          <span style={{ fontWeight: 'bold' }}>{p.buying_date}</span>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}></div>

          <div className='DelButton'>
            <button type="submit" style={{backgroundColor:'red', color:'white', padding:'7px'}} onClick={()=>handleDelete(p._id)}>Delete</button>
          </div>
          </div>
        </div>
      ))}

      
        </div>
        </Company_Sidebar>
        </div>
    );
};


export default Company_History;