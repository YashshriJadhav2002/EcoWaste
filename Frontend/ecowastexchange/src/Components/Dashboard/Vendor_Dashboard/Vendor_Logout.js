import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Vendor_Logout = () => {
    function Logout() {

        toast.success("Logged Out", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
           
            });
            setTimeout(() => {
                localStorage.clear();
                window.location.href = '/';
            }, 3000);

    }
    return (
     
        <>
        <ToastContainer/>
       {Logout()}
        </>

    );
};

export default  Vendor_Logout;