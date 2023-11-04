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

    return (

        <div >
        <Seller_Navbar></Seller_Navbar>
          
          <div class="sellersetting-container">
            <div class="photo">
              
              <img src={formData.Avatar} alt="" />
              <button
              type="Edit_profile"
              className="Edit_profile">Edit Profile</button>
              
              </div>
  
            <div class="contact-form">
              <form action="index.html" autocomplete="off">
                <h3 class="title">User data</h3>
                <label for="">Seller Name</label>
                <div class="inputvalues-container">
                  <input type="text" name="name" value={formData.Name} class="contact-input" />
                  
                </div>
                <label for="">Phone Number</label>
                <div class="inputvalues-container">
                  <input type="tel" value={formData.Phone} class="contact-input" />
                </div>

                <label for="">Address</label>
                <div class="inputvalues-container textarea">
                <textarea name="text" value={formData.Address} class="contact-input"></textarea>
                </div>

                <label for="">Email</label>
                <div class="inputvalues-container">
                <input type="email" value={formData.Email} class="contact-input" />
                </div>

                <label for="">City</label>
                <div class="inputvalues-container">
                <input type="city" value={formData.City} class="contact-input" />
                </div>

                <label for="">State</label>
                <div class="inputvalues-container">
                <input type="state" value={formData.State} class="contact-input" />
                </div>

               
              </form>
            </div>
          </div>
        </div>
    )
}

export default Seller_Settings;
