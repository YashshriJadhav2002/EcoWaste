import React, { useState, useEffect, useRef } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import '../../../Styles/Seller_Navbar.css';
import logo from '../../../Images/l_new4.png'

const Vendor_Navbar = () => {
  const [formData, setFormData] = useState({
    Name:'',
    Avatar:''
  });

  useEffect(()=> {

    const fetchUser = async() => {
      const token = localStorage.getItem("vendor-token")
      const res=await fetch('/api/vendor/profile',
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
        Avatar: data.data.Avatar,


          })


        }
    }
    
    fetchUser()

  }, [])

  const [ProfileOpen, setProfileOptions] = useState(false);
  const [SellerOpen, setSellerOptions] = useState(false);
  const dropdownContainerRef = useRef(null);

  const sellerOptions = ["Smartphones", "Earbud", "Laptop"];
  const settingOptions = ["Settings", "Logout"];

  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (event) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        // Click occurred outside the dropdowns, close both dropdowns
        setProfileOptions(false);
        setSellerOptions(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <nav className='heading'>
      <div className="">
      <img src={logo} style={{width:"6vw",height:"11vh"}}/>
      </div>
      <div className='Welcome-seller'>
        <h2 className='head'>WELCOME, {formData.Name}</h2>
      </div>
      <div className="navbar-links-container3" ref={dropdownContainerRef}>
        <div className='sellgadgetname'>
          <a href="#" onClick={() => setSellerOptions(!SellerOpen)}>Sell Gadget</a>
          {SellerOpen && (
            <div className="dropdown-menu-sellergadget">
              {sellerOptions.map((option, index) => (
                <a href={'Vendor'+option} key={option}>
                  {option}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <a href="#" onClick={() => setProfileOptions(!ProfileOpen)}>

          <img src={formData.Avatar} className='profilephoto' alt="" />
        </a>
        {ProfileOpen && (
          <div className="dropdown-menu3">
            {settingOptions.map((option, index) => (
              <a href={"Vendor"+option} key={option}>

                {option}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default  Vendor_Navbar;
  