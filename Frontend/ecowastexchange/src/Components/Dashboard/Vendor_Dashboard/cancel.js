import React from 'react'
import { useParams } from "react-router-dom";


const Cancel=()=>{

    const { name } = useParams();

    const centeredContainerStyle = {
        textAlign: 'center',
        margin: '50px',
    };
    
    const imageStyle = {
        maxWidth: '500px',
        height: 'auto',
    };
    
    const textContainerStyle = {
        marginLeft: '20px',
        marginTop: '70px', // Adjust the margin as needed
    };
    
    const redTextStyle = {
        color: 'red',
    };
    
    const buttonStyle = {
        background: 'red',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px', // Adjust the border radius for curved ends
        cursor: 'pointer',
    };
    
    return (
        <div style={centeredContainerStyle}>
            <img
                src="https://1.bp.blogspot.com/-Lypzb5BW_2Q/XbVuZ51SYJI/AAAAAAAAAFo/VOMWTd7m-IE_5c2RqJC_MT_0MxOlqaeGQCLcBGAsYHQ/s1600/payment_fail01.jpg"
                alt="Failed Icon"
                style={imageStyle}
            />
            <div style={textContainerStyle}>
               
                <button style={buttonStyle} onClick={window.location.href='/SellerHome'}>Go to home</button>
            </div>
        </div>
    );
}
export default Cancel;