import React from "react";

const Company_Logout = () => {

    
   
    function Logout() {

        window.alert(
            "Logged out"
        )
        localStorage.clear()
        window.location.href = '/Login';

    }
    return (
     
        <>
       {Logout()}
        </>

    );
};

export default Company_Logout;