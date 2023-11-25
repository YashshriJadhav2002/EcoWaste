import React, { useEffect, useState } from 'react';

import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';
import { FaSearch } from 'react-icons/fa';



const Company_Home = () => {
  
  const [cityName,setCityName]=useState([]);
  const [product, setProductData] = useState([]);

//const fetchCityName = async (value) =>{

    const fetchCityName = async() => {
      let productData = []
      const token = localStorage.getItem("company-token");
      const cityname=cityName;
 
      const res=await fetch('/api/company/home',
      {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json",
        },
        body: JSON.stringify({
          auth_token: token,
          cityname
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

  


const handleChange = (value) =>{
  setCityName(value);
  
}

const handleSubmit=()=>{
  fetchCityName();
}

  return (
      <div>
       <Company_Navbar> </Company_Navbar>
      <Company_Sidebar> 
         <div>
          <FaSearch></FaSearch>
          <input placeholder='type to search' value={cityName} onChange={(e)=>handleChange(e.target.value)}></input>
          <button onClick={handleSubmit}>submit</button>
         </div>
      <div>
      {/* <text>Search Result of Vendors for city {cityName}</text> */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }} >
      {product.map(product => (
        <div key={product._id} style={{ backgroundColor: '#fff', border: '0.1vh solid #ddd', padding: '5vh', textAlign: 'center' }} className='devices' onClick={function() 
        {
          localStorage.setItem("product_id",product._id)
          window.location.href = '/vendorProductList'
        }
        }>
          <img src={product.Avatar} alt={product.Name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ fontWeight: 'bold' }}>Name : {product.Name}</div>
          <div style={{ fontWeight: 'bold' }}>Phone :{product.Phone}</div>
          <div style={{ fontWeight: 'bold' }}>Address :{product.Address}</div>
  

        </div>  
      ))}
    </div>
    </div>
      </Company_Sidebar>
    </div>
    );
};

export default Company_Home;