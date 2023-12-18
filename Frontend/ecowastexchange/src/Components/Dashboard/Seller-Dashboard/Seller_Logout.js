import React from "react";

const Seller_Logout = () => {

    
   
    function Logout() {

        window.alert(
            "Logged out"
        )
        localStorage.removeItem("auth-token")
        window.location.href = '/';

    }
    return (
     
        <>
       {Logout()}
        </>

    );
};

export default Seller_Logout;