import React from 'react';
import Vendor_Sidebar from './Vendor_Sidebar';
import Vendor_Navbar from './Vendor_Navbar';
import '../../../Styles/Seller_Navbar.css';
import { useEffect,useState } from 'react';


const  Vendor_History = () => {

  const [product, setProductData] = useState([])

   
  useEffect(()=> {

    const fetchUser = async() => {


      let productData = []
      const token = localStorage.getItem("vendor-token")
 
      const res=await fetch('/api/vendor/history',
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
          
          data.data2.forEach((product, index) => {
            const jsonString = JSON.stringify(product);
            const dataparse2=JSON.parse(jsonString)
            productData.push(dataparse2);
            
          });
          console.log(productData)

          setProductData([...product,...productData])
          
        }
       
        
       
    }
    
    fetchUser()
    
   
  }, [])


  const handleDelete = async (productId) => {

    const product_id = productId
    alert(product_id)

    const res = await fetch('/api/vendor/history/delete',{
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

    return (
      <div>
      <Vendor_Navbar/>
      <Vendor_Sidebar>

      <div><h2 className='head'>My History</h2></div>
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
        </Vendor_Sidebar>
        </div>
    );
};

export default  Vendor_History;