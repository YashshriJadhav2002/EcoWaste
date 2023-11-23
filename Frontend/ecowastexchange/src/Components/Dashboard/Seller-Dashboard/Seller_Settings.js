import React from "react";
import {useState, useEffect} from "react";
import seller from "../../../Images/seller.jpg";
import "../../../Styles/Seller_Settings.css";
import Seller_Navbar from "./Seller_Navbar";
const Seller_Settings = () => {

    
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        Address: '',
        Email: '',
        City: '',
        State: '',
        Avatar: null,
      });

      const [readOnly,setReadonly]=useState(true)
    
      useEffect(()=> {

        const fetchUser = async() => {


          const token = localStorage.getItem("auth-token")
          const res=await fetch('/api/seller/profile',
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
              
              setFormData({

                  Name: data.data.Name,
                  Phone: data.data.Phone,
                  Address: data.data.Address,
                  Email: data.data.Email,
                  City: data.data.City,
                  State: data.data.State,
                  Avatar: data.data.Avatar,


              })


            }
        }
        
        fetchUser()

      }, [])

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // const postDetails=(pics)=>{
    
      //   if(pics.type==='image/jpg'||pics.type==='image/png'||pics.type==='image/jpeg'||pics.type==='image/JPG'||pics.type==='image/PNG'||pics.type==='image/JPEG')
      //   {
      //     const data=new FormData();
      //     data.append('file',pics);
      //     data.append('upload_preset','Ecowastemanagement')
      //     data.append('cloud_name','dfjwwbdv6')
      //     fetch('https://api.cloudinary.com/v1_1/dfjwwbdv6/image/upload',{
      //       method:"post",
      //       body:data,
    
      //     }).then((res)=>res.json()).then((data)=>{
      //       setFormData({...formData,Avatar:data.url.toString()})
      //     }).catch((err)=>{
      //     })
      //   }
      //   else
      //   setErrors({...errors,Avatar:"Invalid File Format"})
      // }

      

    return (

        <div >
        <Seller_Navbar></Seller_Navbar>
          
          <div class="sellersetting-container">
            <div class="photo">
              
              <img src={formData.Avatar} alt=""/>
              <button
              type="Edit_profile"
              className="Edit_profile"  >Edit Profile</button>
              
              </div>
  
            <div class="contact-form">
              <form autocomplete="off">
                <h3 class="title">User data</h3>
                <label for="">Seller Name</label>
                <div class="inputvalues-container">
                  <input type="text" name="name" value={formData.Name} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange} />
                  
                </div>
                <label for="">Phone Number</label>
                <div class="inputvalues-container">
                  <input type="text" name="phone" value={formData.Phone} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange} />
                </div>

                <label for="">Address</label>
                <div class="inputvalues-container textarea">
                <textarea type="text" name="address" value={formData.Address} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange}></textarea>
                </div>

                <label for="">Email</label>
                <div class="inputvalues-container">
                <input type="text" name="email" value={formData.Email} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange} />
                </div>

                <label for="">City</label>
                <div class="inputvalues-container">
                <input type="text" name="city" value={formData.City} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange}/>
                </div>

                <label for="">State</label>
                <div class="inputvalues-container">
                <input  type="text" name="state" value={formData.State} class="contact-input" readOnly={readOnly} onChange={()=>handleInputChange}/>
                </div>

               
              </form>
            </div>
          </div>
        </div>
    )
}

export default Seller_Settings;
