/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../Styles/Login.css'
import { useLocation } from 'react-router-dom';
import logo from '../../Images/l_new4.png'
import login from '../../Images/loginback.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const data = await res.json()
    console.log(data)
    if (res.status === 200) 
    {
      setErrors({
        Email: '',
        Password: '',
        database:'',

      })
     
      
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
        });
      if (page === "Seller") {
        localStorage.setItem("auth-token", data.data)
        localStorage.setItem("user",data.id)

        setTimeout(() => {
          window.location.href = '/SellerHome'
        }, 3000);

      }

      else if (page === "Vendor") {
        localStorage.setItem("vendor-token", data.data)
        localStorage.setItem("user",data.id)

        setTimeout(() => {
          window.location.href = '/VendorHome'
        }, 3000);


      }
      else if(page === "Company"){
 
        localStorage.setItem("company-token", data.data)
        setTimeout(() => {
          window.location.href = '/CompanyHome'
        }, 3000);
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
    
      <div className="lg:flex">
      <ToastContainer/>
            <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className=" bg-emerald-500 sm:bg-white flex justify-start items-center lg:px-0">
              <div className="cursor-pointer">
                <div className='logo' style={{ marginTop: '1rem', marginLeft: '1rem',width:"6vw",height:"8vh" }}>
                  <img src={logo} alt="Logo" />
                </div>
              </div>
            </div>
                <div className="mt-13 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-11 xl:px-24 xl:max-w-2xl py-16">
                    <h2 className="text-center text-4xl text-headings font-display font-semibold lg:text-left xl:text-5xl xl:text-bold ">Log in</h2>
                    <div className="mt-10">
                        <form>
                            <div>

                                <div className="text-lg font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mike@gmail.com"  type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span className="text-sm font-bold text-red-500 tracking-wide">{errors.Email}</span>

                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-headings hover:text-emerald-500cursor-pointer">
                                            Forgot Password?
                                        </a>

                                    </div>

                                </div>
                                <input className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-headings" type="password" placeholder='Password' name="password"  required value={password}  onChange={(e) => setPassword(e.target.value)}/>
                                <span className="text-sm font-bold text-red-500 tracking-wide">{errors.Password}</span>

                            </div>
                            <div className="mt-10">
                                <button className="bg-headings text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-emerald-600
                                shadow-lg" type="login-submit" onClick={LoginData}>
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ? <a className="cursor-pointer text-headings hover:text-emerald-500" onClick={function (event) {
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
            }}>Sign up</a>
                        </div>
                    </div>
                </div>
            
    </div>
    <div class="hidden lg:flex items-center justify-center bg-headings flex-1 h-screen">
    <img src={login} className='object-cover h-70 w-200'/>
               </div>
        </div>
        
    
   
  );
};

export default Login;
