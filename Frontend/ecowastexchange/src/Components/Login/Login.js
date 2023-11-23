import React, { useState } from 'react';
import '../../Styles/Login.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../landing_page/Navbar';

const Login = () => {


  const location = useLocation();
  const page = location.pathname.split('/').pop();

  let Email, Password,databaseapi

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({

    Email: '',
    Password: '',
    database:'',


  })

  const LoginData = async (e) => 
  {

    e.preventDefault();
    if(page==='Seller')
    databaseapi="/api/seller/login"
    else if(page==='Vendor')
    databaseapi="/api/buyer/login"
    else
    databaseapi="/api/company/login"

    const res = await fetch(databaseapi,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: email,
        Password: password
      })

    })

    const data = await res.json();
    if (res.status === 200) 
    {
      setErrors({
        Email: '',
        Password: '',
        database:'',

      })
     
      
      window.alert(data.message)
      if (page === "Seller") {
        localStorage.setItem("auth-token", data.data)

        window.location.href = '/SellerHome'
      }

      else if (page === "Vendor") {


        localStorage.setItem("vendor-token", data.data)

        window.location.href = '/VendorHome'
      }
      else if(page === "Company"){
 
        window.location.href = '/CompanyHome'
      }
      
    }
    else 
    {
      console.log(data.error)
      for (let i = 0; i < data.error.length; i++) 
      {
        if (data.error[i].path === "Email")
          Email = "** " + data.error[i].msg

        else if (data.error[i].path === "Password")
          Password = "** " + data.error[i].msg
        
        

      }
      setErrors({

        Email: Email,
        Password: Password,
      })

    }

  }

 
  return (
    <div>
      <Navbar></Navbar>
    
    <div className='login-container'>
      <div className="header">
        <div className="login-text">Login</div>
        <div className="login-underline"></div>
      </div>

        <form method='POST'>

          <div className="login-inputs">

            <span className='spanmsg'>{errors.Email}</span>
            <div className="login-input">
              {/* <img src={email_icon} alt=""/> */}

              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


            </div>
            <span className='spanmsg'>{errors.Password}</span>
            <div className="login-input">
              {/* <img src={password_icon} alt=""/> */}

              <input
                type="password"
                placeholder='Password'
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
          </div>

          <div className="login-submit-container">
          <button
              type="login-submit"
              className="login-submit"
              onClick={LoginData}

            >Login</button>
            <button type='signup' className="login-submit" onClick={function (event) {
              event.preventDefault();
              if (page === "Seller") {
                window.location.href = '/SellerRegister'
              }

              else if (page === "Vendor") {
                window.location.href = '/VendorRegister'
              }
              else {
                window.location.href = '/CompanyRegister'
              }
            }} >Sign Up</button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default Login;
