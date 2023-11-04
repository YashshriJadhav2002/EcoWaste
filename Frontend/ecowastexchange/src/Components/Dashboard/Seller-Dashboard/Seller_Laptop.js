import React, { useState, useRef } from "react";
import '../../../Styles/SellerGadget.css';
import Seller_Navbar from "./Seller_Navbar";


function Laptop() {
  const [formData, setFormData] = useState({
    question1 : 'What is the name of your product?',
    question2 : 'What is Buying cost of product?',
    question3 : 'Enter Age of the product',
    question4 : "Is ths dislay of phone real?",
    question5 : 'What is Physical condition of product?',
    question6 : 'Is product is second handed?'
  });

  const handleInputChange = (e) => {
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can access the selected image as formData.image and perform actions like uploading it to the server
    console.log(formData);
  };
const [image, setImage] = useState(null);
const hiddenFileInput = useRef(null);

const handleImageChange = (event) => {
const file = event.target.files[0];
const imgname = event.target.files[0].name;
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onloadend = () => {
  const img = new Image();
  img.src = reader.result;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const maxSize = Math.max(img.width, img.height);
    canvas.width = maxSize;
    canvas.height = maxSize;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      (maxSize - img.width) / 2,
      (maxSize - img.height) / 2
    );
    canvas.toBlob(
      (blob) => {
        const file = new File([blob], imgname, {
          type: "image/png",
          lastModified: Date.now(),
        });

        console.log(file);
        setImage(file);
      },
      "image/jpeg",
      0.8
    );
  };
};
};

const handleUploadButtonClick = (file) => {
var myHeaders = new Headers();
const token = "adhgsdaksdhk938742937423";
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("file", file);

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow",
};

fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(JSON.parse(result));
    const profileurl = JSON.parse(result);
    setImage(profileurl.img_url);
  })
  .catch((error) => console.log("error", error));
};

const handleClick = (event) => {
hiddenFileInput.current.click();
};

return (
<div>
  <Seller_Navbar></Seller_Navbar>
<div className="image-upload-container">
  <div className="box-decoration">
    <label htmlFor="image-upload-input" className="image-upload-label">
      {image ? image.name : "Choose an image"}
    </label>
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {image ? (
        <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
      ) : (
        <img src="./photo.png" alt="upload image" className="img-display-before" />
      )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
        <button
          className="image-upload-button"
          onClick={handleUploadButtonClick}
        >
          Upload
        </button>
        </div>
      </div>
      <div className='smartphone-container'>
      <form onSubmit={handleSubmit}>
        <div className="smartphone-inputs">
        <label>{formData.question1}</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="question1"
              onChange={handleInputChange}
            />
          </div>
          <label>{formData.question2}</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="question2"
              onChange={handleInputChange}
            />
          </div>
          <label>{formData.question3}</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="question3"
              onChange={handleInputChange}
            />
          </div>
          <label>{formData.question4}</label>
          <div>
            <input type="radio" value="Good" name="physical-condition" /> Good <br></br>
            <input type="radio" value="Better" name="physical-condition" />Better<br></br>
            <input type="radio" value="Worst" name="physical-condition" /> Worst
              
        
          </div>
          <label>{formData.question5}</label>
          <div>
          <input type="radio" value="Yes" name="second-hand" />Yes<br></br>
            <input type="radio" value="No" name="second-hand" /> No
          </div>
        </div>
        
        <div className="smartphone-submit-container">
        <button type='continue' className="smartphone-submit" onClick={() =>window.location.href = '/ExactPrice'}>Continue</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Laptop;

