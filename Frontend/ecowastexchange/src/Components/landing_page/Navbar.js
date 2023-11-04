import React, { useState, useRef, useEffect } from 'react';
import '../../../src/Styles/Home.css';
import Logo from '../../../src/Images/Logo.png';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = () => {
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const dropdownContainerRef = useRef(null);

  const loginMenuOptions = ["Vendor", "Seller", "Company"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container" ref={dropdownContainerRef}>
        <a href="/">Home</a>
        <a href="aboutUs">About Us</a>
        <a href="vision">Vision</a>
        <a href="contact">Contact</a>
        <a href="#" onClick={() => setLoginMenuOpen(!loginMenuOpen)}>
          Login 
        </a>
        {loginMenuOpen && (
          <div className="dropdown-menu">
            {loginMenuOptions.map((option, index) => (
              <a href={option} key={option}>
                {option}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
