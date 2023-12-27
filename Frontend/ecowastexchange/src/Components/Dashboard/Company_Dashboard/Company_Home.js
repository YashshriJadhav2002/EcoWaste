import React, { useEffect, useState } from 'react';

import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';
import search  from '../../../Images/search.png';


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
      <div className="rounded shadow-lg mb-6 bg-white flex justify-center items-center border-2" style={{"padding-left": "5rem", "padding-top": "3rem", "paddingBottom": "3rem", "width": "80vw","margin-left":"20px"}}>
  <div className="flex flex-col justify-start items-start">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={search} style={{ width: '2.5vw', height: '4vh', marginLeft: '-40px', marginTop: '40px' }} />
      <input
        placeholder='Type to search'
        value={cityName}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          height: '40px',
          padding: '5px',
          width: '60vw',
          marginTop: '35px',
          marginLeft: '10px',
          border: '2px solid black',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#00a49c',
          color: 'white',
          padding: '7px',
          cursor: 'pointer',
          height: '40px',
          marginTop: '5vh',
          marginLeft: '10px',
        }}
        type='submit'
      >

        Search
      </button>
    </div>
    <div>
    <div className="mt-10 lg:mt-12 custom-grid ">
        {product.map((product) => (
          <div
            key={product._id}
            className="flex flex-col mt-6 custom-hover-effect px-8 py-5 border-2"
            onClick={function () {
              localStorage.setItem('vendor_id', product._id);
              window.location.href = '/vendorProductList';
            }}
          >
            
            <img style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '1vh', marginBottom: '5vh',width:'240px',height:'42vh'}} src={product.Avatar} alt={product.Name} />

            
            <div style={{ fontWeight: 'bold' }}>Name : {product.Name}</div>
            <div style={{ fontWeight: 'bold' }}>Phone : {product.Phone}</div>
            <div style={{ fontWeight: 'bold' }}>Address : {product.Address}</div>
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