import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import success from "../../../Images/success.png";

const SellerVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(true);

  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/verify/?token=${token}`, { method: "GET" });
        const data = await response.json();
        setValidUrl(true);
        setVerificationInProgress(false);
        window.alert(data.message);
      } catch (error) {
        setValidUrl(false);
        setVerificationInProgress(false);
        window.alert("Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  
  const styles = {
    centerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginTop:'10vh',
    },
    success_img: {
      maxWidth: "100px",
      height: "auto",
    },
    greenText: {
      marginTop:"5vh",
      color: "green",
    },
    green_btn: {
      backgroundColor: "green",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "8vh", 
    },
  };

  return (
    <Fragment>
      {verificationInProgress ? (
        <div>Loading...</div>
      ) : validUrl ? (
        <div style={styles.centerContainer}>
          <img src={success} alt="success_img" style={styles.success_img} />
          <h1 style={styles.greenText}>Email verified successfully</h1>
          <Link to="/login">
            <button style={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default SellerVerify;
