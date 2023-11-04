import React, { useState, useEffect, useRef } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import '../../../Styles/Seller_Navbar.css';

const Company_Navbar = () => {
  const [data, setData] = useState('');
  const [profile, setProfile] = useState('');

  
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
        <img src='Logo.png' alt="" />
      </div>
      <div className='Welcome-seller'>
        <h2>WELCOME, {data}</h2>
      </div>
      <div className="navbar-links-container3" ref={dropdownContainerRef}>
        <div className='sellgadgetname'>
          <a href="#" onClick={() => setSellerOptions(!SellerOpen)}>Sell Gadget<ArrowDropDownIcon /></a>
          {SellerOpen && (
            <div className="dropdown-menu-sellergadget">
              {sellerOptions.map((option, index) => (
                <a href={'Company'+option} key={option}>
                  {option}
                </a>
              ))}
            </div>
          )}
        </div>
        <a href="#" onClick={() => setProfileOptions(!ProfileOpen)}>
          <img src={profile} className='profilephoto' alt="" /><ArrowDropDownIcon />
        </a>
        {ProfileOpen && (
          <div className="dropdown-menu3">
            {settingOptions.map((option, index) => (
              <a href={'Company'+option} key={option}>
                {option}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default  Company_Navbar;
  