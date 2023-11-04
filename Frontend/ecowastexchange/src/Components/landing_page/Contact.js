import React from 'react';
import location from '../../../src/Images/location.png';
import email from '../../../src/Images/email.png';
import phone from '../../../src/Images/phone.png';
import instagram from '../../../src/Images/instagram.png';
import twitter from '../../../src/Images/twitter.png';
import facebook from '../../../src/Images/facebook.png';
import linkedin from '../../../src/Images/linkedin.png';
import '../../../src/Styles/Contact.css';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div >
    <Navbar></Navbar>
      <span ></span>
      <img src="img/shape.png" class="square" alt="" />
      <div class="form">
        <div class="contact-info">
          <h3 class="title">Let's get in touch</h3>
          <p class="text">
            
          </p>

          <div class="info">
            <div class="information">
              <img src={location} class="icon" alt="" />
              <p>House Of Peace, Shanti Nagar, Pune</p>
            </div>
            <div class="information">
              <img src={email} class="icon" alt="" />
              <p>rutuja.bhoyar@cumminscollege.in</p>
            </div>
            <div class="information">
              <img src={phone} class="icon" alt="" />
              <p>9579385191</p>
            </div>
          </div>

          <div class="social-media">
            <p>Connect with us :</p>
            <div class="social-icons">
              <a href="https://instagram.com/the_economic_times?igshid=MzRlODBiNWFlZA==">
              <img src={instagram}  alt="" style={{"width":"3vw"}}/>
              </a>
              <a href="https://twitter.com/">
              <img src={twitter} alt="" style={{"width":"3vw"}}/>
              </a>
              <a href="https://www.facebook.com/EconomicTimes">
              <img src={facebook} alt="" style={{"width":"2.5vw"}} />
              </a>
              <a href="https://www.linkedin.com/in/rutuja-bhoyar-2953b7247">
              <img src={linkedin} alt="" style={{"width":"2.5vw"}} />
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form action="index.html" autocomplete="off">
            <h3 class="title">Contact us</h3>
            <div class="inputvalues-container">
              <input type="text" placeholder="Name" class="contact-input" />
              <label for=""></label>
              <span>Username</span>
            </div>
            <div class="inputvalues-container">
              <input type="email" placeholder="Email" class="contact-input" />
              <label for=""></label>
              <span>Email</span>
            </div>
            <div class="inputvalues-container">
              <input type="tel" placeholder="Phone" class="contact-input" />
              <label for=""></label>
              <span>Phone</span>
            </div>
            <div class="inputvalues-container textarea">
              <textarea name="message" placeholder="Message" class="contact-input"></textarea>
              <label for=""></label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" class="btn" />
          </form>
        </div>
      </div>
    </div>
  
  )}

export default Contact; 


