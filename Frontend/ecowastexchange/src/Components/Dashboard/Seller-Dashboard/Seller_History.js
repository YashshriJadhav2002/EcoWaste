import React from 'react';
import Seller_Sidebar from './Seller_Sidebar';
import Seller_Navbar from './Seller_Navbar';
import '../../../Styles/Seller_Navbar.css';
import {useEffect, useState} from 'react'

const Seller_History = () => {

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
        window.alert(data.message)

      }
      else {
        window.alert(data.error);
      }
  }

    return (
      
      <div>
        <Seller_Navbar/>
        <Seller_Sidebar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }} >
      {product.map((p)=> (
       
        <div key={p._id} style={{ display: 'flex', backgroundColor: 'rgb(152, 235, 152)', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices'>
          <img src={p.Avatar} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>

          <div style={{ fontWeight: 'bold' }}>{p.Name}</div>
          <div style={{ fontWeight: 'bold' }}>{p.SellingPrice}</div>
          <div style={{ fontWeight: 'bold' }}>{p.selling_date}</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}></div>
          <div className='DelButton'>
            <button type="submit" style={{backgroundColor:'red', color:'white', padding:'7px'}} onClick={()=>handleDelete(p._id)}>Delete</button>
          </div>
          </div>
        </div>
      ))
      }
    

    </div>
        </Seller_Sidebar>
      </div>
    );
};

export default Seller_History;