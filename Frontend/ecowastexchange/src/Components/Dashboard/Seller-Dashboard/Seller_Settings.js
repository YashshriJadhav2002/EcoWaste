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

      const [editMode, setEditMode] = useState(false);

      const postData= async()=>{
        console.log("Hello");
              const token =localStorage.getItem('auth-token')
              const {Name,Email,Phone,Address,City,State,Avatar}=formData;
    
              const res=await fetch('/api/seller/update/profile',{
                method:"POST",
                headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                auth_token:token,
                Name,Email,Phone,Address,City,State,Avatar
              })
            })
    
            const data= await res.json();
    
            if(res.status===200)
            window.alert(data.message)
            else
            window.alert(data.error)
            
    }
    
    
    
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

      const handleEditProfile = () => {
        if(!editMode){
        setEditMode(!editMode);
        }
        else{
          postData();
          setEditMode(!editMode);
        }
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        const file = e.target.files[0];
        setFormData({
          ...formData,
          [name]: value,
           Avatar: URL.createObjectURL(file),
           avatarFile: file,
        });
      };

    return (
        <div>
      <Seller_Navbar></Seller_Navbar>

      <div className="sellersetting-container">
        <div className="photo">
          {/* <img src={formData.Avatar} alt="" /> */}
          <label htmlFor="avatarInput">
            <img src={formData.Avatar} alt="" />
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="button"
            className="login-submit"
            onClick={handleEditProfile}
          >
            {editMode ? "Save" : "Edit profile"}
          </button>
        </div>

        <div className="contact-form">
          <form action="index.html" autoComplete="off">
            <h3 className="title">User data</h3>
            <label htmlFor="">Seller Name</label>
            <div className="inputvalues-container">
              <input
                type="text"
                name="Name"
                value={formData.Name}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">Phone Number</label>
            <div className="inputvalues-container">
              <input
                type="tel"
                name="Phone"
                value={formData.Phone}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">Address</label>
            <div className="inputvalues-container textarea">
              <textarea
                name="Address"
                value={formData.Address}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <label htmlFor="">Email</label>
            <div className="inputvalues-container">
              <input
                type="email"
                name="Email"
                value={formData.Email}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">City</label>
            <div className="inputvalues-container">
              <input
                type="city"
                name="City"
                value={formData.City}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">State</label>
            <div className="inputvalues-container">
              <input
                type="state"
                name="State"
                value={formData.State}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Seller_Settings;
