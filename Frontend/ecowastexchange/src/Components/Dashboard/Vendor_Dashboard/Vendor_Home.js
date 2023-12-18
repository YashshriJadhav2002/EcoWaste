import React, { useEffect,useState } from 'react';
import Vendor_Sidebar from './Vendor_Sidebar';
import Vendor_Navbar from './Vendor_Navbar';
import '../../../Styles/Seller_Navbar.css';

const  Vendor_Home = () => {
  const [product, setProductData] = useState([])
  
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
       <Vendor_Navbar></Vendor_Navbar>
      <Vendor_Sidebar>
      <div><h2 className='head'>Electronic Products </h2></div> 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }} >
      {product.map(product => (
        <div key={product._id} style={{ backgroundColor: '#fff', border: '0.1vh solid #ddd', padding: '5vh', textAlign: 'center' }} className='devices' onClick={function() 
        {
          localStorage.setItem("product_id",product._id)
          window.location.href = '/VendorExactPrice'
        }
        }>
          <img src={product.Avatar} alt={product.Name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ fontWeight: 'bold' }}>{product.Name}</div>
          <div style={{ fontWeight: 'bold' }}>{product.SellingPrice}</div>
  

        </div>  
      ))}
    </div>
      
      </Vendor_Sidebar>
    </div>
    );
};

export default  Vendor_Home;