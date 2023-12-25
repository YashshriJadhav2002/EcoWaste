import React, { useEffect, useState } from 'react';

import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';
import { FaSearch } from 'react-icons/fa';



const Company_Home = () => {
  const [session,useSession]=useState(localStorage.getItem("company-token"))

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
    {
      session===null?<div className="mt-3">
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
  </div>:
      <div>
       <Company_Navbar> </Company_Navbar>
      <Company_Sidebar> 
      <div class="rounded shadow-lg mb-6 bg-white flex justify-start items-start border-2" style={{"padding-left":" 3rem","padding-top": "3rem","paddingBottom":"3rem"}}>
      <div className="flex flex-col justify-start items-start">
         <div>
         <FaSearch style={{ fontSize: '26px', marginBottom: '-10px' }}></FaSearch>
          <input
            placeholder='Type to search'
            value={cityName}
            onChange={(e)=>handleChange(e.target.value)}
            style={{
              height: '40px', 
              padding: '5px',
              width:'300px',
            }}
          ></input>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '5px',
              cursor: 'pointer',
              height: '40px',
              marginTop:'7vh',
            }}
          >
            Submit
          </button>
         </div>
      <div>
      {/* <text>Search Result of Vendors for city {cityName}</text> */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }} >
      {product.map(product => (
        <div key={product._id} style={{ backgroundColor: '#fff', border: '0.1vh solid #ddd', padding: '5vh', textAlign: 'center' }} className='devices' onClick={function() 
        {
          localStorage.setItem("vendor_id",product._id)
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
    </div>
    </div>

      </Company_Sidebar>
    </div>
    }
    </div>
    );
};

export default Company_Home;