import React from "react";
import {useState, useEffect} from "react";
import seller from "../../../Images/seller.jpg";
import "../../../Styles/Seller_Settings.css";
import Company_Navbar from "./Company_Navbar";

const Company_Settings = () => { 
    
  const [session,useSession]=useState(localStorage.getItem("company-token"))

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
          const token =localStorage.getItem('company-token')
          const {Name,Email,Phone,Address,City,State,Avatar}=formData;

          const res=await fetch('/api/company/update/profile',{
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


      const token = localStorage.getItem("company-token")
      const res=await fetch('/api/company/profile',
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

  const postDetails=(pics)=>{

    if(pics.type==='image/jpg'||pics.type==='image/png'||pics.type==='image/jpeg'||pics.type==='image/JPG'||pics.type==='image/PNG'||pics.type==='image/JPEG')
    {
      const data=new FormData();
      data.append('file',pics);
      data.append('upload_preset','Ecowastemanagement')
      data.append('cloud_name','dfjwwbdv6')
      fetch('https://api.cloudinary.com/v1_1/dfjwwbdv6/image/upload',{
        method:"post",
        body:data,

      }).then((res)=>res.json()).then((data)=>{
        setFormData({...formData,Avatar:data.url.toString()})
      }).catch((err)=>{
      })
    }
  
  }

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
    {
      session===null?<div className="mt-3">
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Your session has expired</h1>
  </div>:
    <div>
  <Company_Navbar></Company_Navbar>

  <div className="sellersetting-container">
    <div className="photo">
      <label htmlFor="avatarInput">
        <img src={formData.Avatar} alt="" />
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e)=>postDetails(e.target.files[0])}
        />
      </label>
      <button
        type="button"
        className="login-submit1"
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
    }
    </div>
)
}

export default Company_Settings;
