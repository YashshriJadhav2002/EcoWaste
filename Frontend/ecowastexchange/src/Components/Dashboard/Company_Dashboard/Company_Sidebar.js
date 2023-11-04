import React, { useState, useEffect } from 'react';

import '../../../Styles/Seller_Sidebar.css'


import {
    FaTh,
    FaBars,
    FaShoppingCart,
    FaRegChartBar
    
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';



const Company_Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/CompanyHome",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:"/CompanyCart",
            name:"Cart",
            icon:<FaShoppingCart/>
        },
        {
            path:"/CompanyHistory",
            name:"History",
            icon:<FaRegChartBar/>
        }
    ]
    return (
        <div className="container-sidebar">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className='home-container' onClick={toggle}>{children}</main>
        </div>
    );
};

export default Company_Sidebar;