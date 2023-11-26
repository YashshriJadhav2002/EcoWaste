import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useParams} from 'react-router-dom';
import success from '../../../Images/success.png'
import styles from '../../../Styles/verify.css'

const CompanyVerify=()=>{

  const [validUrl,setVaildUrl]=useState(false);

  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try 
      {
        const response = await fetch(`/verifyCompany/?token=${token}`,{method:"GET"});
        
        const data = await response.json();
        setVaildUrl(true);
        
        window.alert(data.message);
      } 
      catch (error) {
        setVaildUrl(false)
        window.alert('Email verification failed. Please try again.');
      }
    };

    
      verifyEmail();
    
  }, [token]);


    return(

      <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
        <h1>Email verified successfully</h1>
        <Link to='/login'>
          <button className={styles.green_btn}>Login</button>
        </Link>
        </div>
      ):(
        <h1>404 Not Found</h1>
      )
      }
      </Fragment>
    )
};

export default CompanyVerify;