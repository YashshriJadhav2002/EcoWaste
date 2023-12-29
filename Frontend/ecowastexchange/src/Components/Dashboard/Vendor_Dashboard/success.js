import React from 'react'
import { useParams } from "react-router-dom";


const Success=()=>{

    const { name } = useParams();

    const centeredContainerStyle = {
        textAlign: 'center',
        margin: '50px',
    };

    const imageStyle = {
        maxWidth: '100px',
        height: 'auto',
    };

    const textContainerStyle = {
        marginLeft: '20px',
        marginTop: '70px', // Adjust the margin as needed
    };

    const greenTextStyle = {
        color: 'green',
    };

    const buttonStyle = {
        background: 'green',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px', // Adjust the border radius for curved ends
        cursor: 'pointer',
    };

    return (
        <div style={centeredContainerStyle}>
            <img
                src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
                alt="Success Icon"
                style={imageStyle}
            />
            <div style={textContainerStyle}>
                <h1>
                    <p style={greenTextStyle}>Order Placed Successfully !!</p>
                </h1>
                <button style={buttonStyle} onClick={function(){
                    if(name=="company")window.location.href='/CompanyHome'
                    else if(name==="seller")window.location.href='/SellerHome'
                    else window.location.href='/VendorHome'
                }}>Go to home</button>
            </div>
        </div>
    );

}
export default Success;