import React, { useState, useRef } from "react";
import '../../../Styles/SellerGadget.css';
import Company_Navbar from "./Company_Navbar";


function Company_SmartPhones() {
    
    let name, buyingPrice, age, display, cond, second;

    const [id, setId] = useState('')
    const [productData, setProductData] = useState({

      Name : '',
      BuyingPrice: '',
      Age: '',
      isDisplay: '',
      isCond: '',
      isSecond: '',
      Avatar: ''
    })

    const [errors,setErrors]=useState({
      
      Name : '',
      BuyingPrice: '',
      Age: '',
     
      isDisplay: '',
      isCond: '',
      isSecond: ''
  
    })
      
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
     {
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleContinue = async (e) => {

    e.preventDefault()

    const {Name, BuyingPrice, Age, isDisplay, isCond, isSecond, Avatar} = productData
    const res = await fetch('/api/product/prediction', {method:'POST', 
    headers: {

      "Content-Type":"application/json",
    
    },
    body: JSON.stringify({

      Name, BuyingPrice, Age,isDisplay, isCond, isSecond, Avatar

    })
      
    
  })

    const data = await res.json()
    if(res.status===200) {


      window.alert("Details saved successfully")
      setId (data.id)
      console.log(data.id)
      setErrors({


        Name : '',
        BuyingPrice: '',
        Age: '',
        
        isDisplay: '',
        isCond: '',
        isSecond: ''

      })
      window.location.href = '/CompanyExactPrice'
      // setConditionMet(true)
    //  return <Exact_Price id={data.id}/>


    }
    else {

      console.log(productData)

      for(let i=0; i<data.error.length; i++) {

        if(data.error[i].path==="Name")
        name="** "+data.error[i].msg
      
        else if(data.error[i].path==="BuyingPrice")
        buyingPrice ="** "+data.error[i].msg

        else if(data.error[i].path==="Age")
        age="** "+data.error[i].msg
        
        
        else if(data.error[i].path==="isDisplay")
        display="** "+data.error[i].msg
        
        else if(data.error[i].path==="isCond")
          cond="** "+data.error[i].msg

        else if(data.error[i].path==="isSecond")
        second="** "+data.error[i].msg


      }

      setErrors( {

        Name : name,
        BuyingPrice: buyingPrice,
        Age: age,
        isDisplay: display,
        isCond: cond,
        isSecond: second



      })

    }
  }

    

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <Company_Navbar></Company_Navbar>

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
        {/* <button
          className="image-upload-button"
          onClick={handleUploadButtonClick}
        >
          Upload
        </button> */}
        </div>
      </div>
      <div className='smartphone-container'>
      <form >
        <div className="smartphone-inputs">
        <label>What is the name of your product?</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="Name"
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Name}</span>

        <label>What is Buying cost of product?</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="BuyingPrice"
              onChange={handleInputChange}
            />
          </div>
          <label>What is the Age of your product</label>
          <div className="smartphone-input">
            <input
              type="text"
              name="Age"
              onChange={handleInputChange}
            />
          </div>
          <span className='spanmsg'>{errors.Age}</span>
         
          
          <label>Is ths dislay of phone real?</label>
          <div>
          <input type="radio" value="Yes" name="isDisplay" checked={productData.isDisplay === 'Yes'} onChange={handleInputChange}/>Yes<br></br>
            <input type="radio" value="No" name="isDisplay" checked={productData.isDisplay=== 'No'} onChange={handleInputChange}/> No
              
          </div>
          <span className='spanmsg'>{errors.isDisplay}</span>

          <label>What is Physical condition of product?</label>
          <div>
            <input type="radio" value="Good" name="isCond" checked={productData.isCond === 'Good'} onChange={handleInputChange}/> Good <br></br>
            <input type="radio" value="Better" name="isCond" checked={productData.isCond === 'Better'} onChange={handleInputChange}/>Better<br></br>
            <input type="radio" value="Worst" name="isCond" checked={productData.isCond === 'Worst'} onChange={handleInputChange}/> Worst
              
        
          </div>
          <span className='spanmsg'>{errors.isCond}</span>

          <label>Is product is second handed?</label>
          <div>
          <input type="radio" value="Yes" name="isSecond" checked={productData.isSecond === 'Yes'} onChange={handleInputChange} />Yes<br></br>
            <input type="radio" value="No" name="isSecond" checked={productData.isSecond === 'No'} onChange={handleInputChange}/> No
          </div>
          <span className='spanmsg'>{errors.isSecond}</span>

        </div>
        
        <button type='continue' className="smartphone-submit" onClick={handleContinue}>Condition</button>
      
        
      </form>
    </div>
    </div>
  );
}

export default Company_SmartPhones;

