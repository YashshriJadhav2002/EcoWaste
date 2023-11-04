import React from "react";

const  Vendor_Logout = () => {

    
   
    function Logout() {

        window.alert("Logged out")


        localStorage.removeItem("vendor-token")
        window.location.href = '/Login';

    }
    return (
     
        <>
       {Logout()}
        </>

    );
};

export default  Vendor_Logout;