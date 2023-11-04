import React, { useState } from 'react';
import '../../../src/Styles/Register.css';
import Navbar from '../landing_page/Navbar';

const SellerRegister = () => {
  let name,email,phone,address,city,state,password,database,Image

  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Avatar:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    
  });


  const [errors,setErrors]=useState({
    Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Avatar: '',
    database:'',

  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postDetails=(pics)=>{
  
    if(pics.type==='image/jpg'||pics.type==='image/png'||pics.type==='image/jpeg')
    {
      const data=new FormData();
      data.append('file',pics);
      data.append('upload_preset','Ecowastemanagement')
      data.append('cloud_name','dfjwwbdv6')
      fetch('https://api.cloudinary.com/v1_1/dfjwwbdv6/image/upload',{
        method:"post",
        body:data,

      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        setFormData({...formData,Avatar:data.url.toString()})
      }).catch((err)=>{
        console.log(err);
      })
    }
    else
    setErrors({...errors,Avatar:"Invalid File Format"})
  }

  const postData= async(e)=>{
    
    e.preventDefault()
    if(errors.Avatar=="")
    {
    const {Name,Email,Phone,Address,City,State,Password,Avatar}=formData;
  
    const res = await fetch("/api/seller/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify
    ({
        Name,Email,Phone,Address,City,State,Password,Avatar
    })
  
  })


  const data = await res.json()
  if(res.status===200)
  {
    

    window.alert(data.message)
    setErrors({Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Image: '',
    database:"",
})
    window.location.href='/Seller'
    
  }
  else
  {
    console.log(data.error)
    for(let i =0;i<data.error.length;i++)
    {
      if(data.error[i].path==="Name")
        name="** "+data.error[i].msg
      
      else if(data.error[i].path==="Email")
        email ="** "+data.error[i].msg

      else if(data.error[i].path==="Password")
       password="** "+data.error[i].msg
      
      else if(data.error[i].path==="Address")
        address="** "+data.error[i].msg
      
      else if(data.error[i].path==="City")
       city="** "+data.error[i].msg
      
      else if(data.error[i].path==="State")
        state="** "+data.error[i].msg
      
      else if(data.error[i].path==="Phone")
        phone="** "+data.error[i].msg
      else if(data.error[i].path=="Database")
        database="** "+data.error[i].msg
      else if(data.error[i].path=="Avatar")
      Image="** "+data.error[i].msg

      
    }
      setErrors({
        Name:name,
        Email:email,
        Address:address,
        City:city,
        State:state,
        Phone:phone,
        Password:password,
        database:database,
        Avatar:Image,
      })

      
  }

  }
}

  return (
    <div>
    <Navbar></Navbar>
    <div className='register-container'>
      <div className="header">
        <div className="register-text">Register</div>
        <div className="register-underline"></div>
      </div>
      <form method='Post' encType='multipart/form-data'>
        <div className="register-inputs">
        <span className='spanmsg'>{errors.database}</span>
          <div className="register-input">
            <input
              type="text"
              name="Name"
              placeholder="Name"
              required
              value={formData.Name}
              onChange={handleInputChange}
            />
           
          </div>
          <span className='spanmsg'>{errors.Name}</span>
          <div className="register-input">
            <input
              type="number"
              name="Phone"
              placeholder="Phone"
              required
              value={formData.Phone}
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Phone}</span>
          <div className="register-input">
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={formData.Address}
              required
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Address}</span>
          <div className="register-input">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required
              value={formData.Email}
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Email}</span>
          <div className="register-input">
            <input
              type="text"
              name="City"
              placeholder="City"
              required
              value={formData.City}
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.City}</span>
          <div className="register-input">
            <input
              type="text"
              required
              name="State"
              placeholder="State"
              value={formData.State}
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.State}</span>
          <div className="register-input">
            <input
              type="password"
              name="Password"
              required
              placeholder="Password"
              value={formData.Password}
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Password}</span>
        </div>
        <div>
          <div className="register-upload-image">
            <label htmlFor="image">Upload profile photo</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e)=>postDetails(e.target.files[0])}
          
            /><br></br>
          </div>
          <span className='spanmsg'>{errors.Avatar}</span>

        </div>
        <div className="register-submit-container">
          <button type="register-submit" className="register-submit" onClick={postData}>Sign Up</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SellerRegister;
