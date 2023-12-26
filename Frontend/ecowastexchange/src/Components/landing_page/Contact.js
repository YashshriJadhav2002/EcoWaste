import React from 'react';
import {useState} from 'react'
import location from '../../../src/Images/location.png';
import email from '../../../src/Images/email.png';
import phone from '../../../src/Images/phone.png';
import instagram from '../../../src/Images/instagram.png';
import twitter from '../../../src/Images/twitter.png';
import facebook from '../../../src/Images/facebook.png';
import linkedin from '../../../src/Images/linkedin.png';
import '../../../src/Styles/Contact.css';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {

  const [formData, setFormData] = useState({
    Email: '',
    message: '',
    phone:'',
    name:''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const sendEmail = async (e) => {
    e.preventDefault();
    console.log("Hello");
                const token =localStorage.getItem('auth-token')
                const {name,Email,message}=formData;
      
                const res=await fetch('/api/contact/email',{
                  method:"POST",
                  headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  auth_token:token,
                  Email,message,name
                })
              })
      
              const data= await res.json();
      
              if(res.status===200)
              {
                toast.success(data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                 
                  });
                  setFormData({
                  useremail:"",
                  message:"",
                  phone: "",
                  name: ""
                })
              }
              else
              toast.error(data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
               
                });  };

  return (
    <div >
    <Navbar></Navbar>
    <ToastContainer/>

      <span ></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            
          </p>

          <div className="info">
            <div className="information">
              <img src={location} className="icon" alt="" />
              <p>House Of Peace, Shanti Nagar, Pune</p>
            </div>
            <div className="information">
              <img src={email} className="icon" alt="" />
              <p>ecowastexchange2023@gmail.com</p>
            </div>
            <div className="information">
              <img src={phone} className="icon" alt="" />
              <p>8459777201</p>
            </div>
          </div>

          <div className="social-media">
            <h4  className="title">Connect with us </h4><br></br>
            <div className="social-icons">
              <a href="https://instagram.com/the_economic_times?igshid=MzRlODBiNWFlZA==">
              <img src={instagram}  alt="instagram" className='icon'/>
              </a>
              <a href="https://twitter.com/">
              <img src={twitter} alt="twitter" className='icon'/>
              </a>
              <a href="https://www.facebook.com/EconomicTimes">
              <img src={facebook} alt="facebook" className='icon' />
              </a>
              <a href="https://www.linkedin.com/in/rutuja-bhoyar-2953b7247">
              <img src={linkedin} alt="linkedin" className='icon' />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form autocomplete="off">
            <h3 className="title">Contact us</h3>
            <div className="inputvalues-container">
              <input type="text" placeholder="Name" className="contact-input" name="name" value={formData.name}
              onChange={handleInputChange} />
              <label for=""></label>
              <span>Username</span>
            </div>
            <div className="inputvalues-container">
              <input type="email" placeholder="Email" className="contact-input" name="Email" value={formData.useremail}
              onChange={handleInputChange} />
              <label for=""></label>
              <span>Email</span>
            </div>
            <div className="inputvalues-container">
              <input type="tel" placeholder="Phone" className="contact-input" name="phone" value={formData.phone} 
              onChange={handleInputChange} />
              <label for=""></label>
              <span>Phone</span>
            </div>
            <div className="inputvalues-container textarea">
              <textarea name="message" placeholder="Message" className="contact-input" value={formData.message}
              onChange={handleInputChange}></textarea>
              <label for=""></label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" onClick={sendEmail}/>
          </form>
        </div>
      </div>
    </div>
  
  )}



export default Contact; 
