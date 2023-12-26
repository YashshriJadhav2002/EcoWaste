import React, { useState } from 'react';
import '../../../src/Styles/Register.css';
import Navbar from '../landing_page/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerRegister = () => {
  let name,email,phone,address,city,state,password,database

  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Avatar:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    
  });


  const [errors,setErrors]=useState({
    Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Avatar: '',
    database:'',

  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postDetails=(pics)=>{

    if(pics.type==='image/jpg'||pics.type==='image/png'||pics.type==='image/jpeg'||pics.type==='image/JPG'||pics.type==='image/PNG'||pics.type==='image/JPEG')
    {
      const data=new FormData();
      data.append('file',pics);
      data.append('upload_preset','Ecowastemanagement')
      data.append('cloud_name','dfjwwbdv6')
      fetch('https://api.cloudinary.com/v1_1/dfjwwbdv6/image/upload',{
        method:"post",
        body:data,

      }).then((res)=>res.json()).then((data)=>{
        setFormData({...formData,Avatar:data.url.toString()})
      }).catch((err)=>{
      })
    }
    else
    setErrors({...errors,Avatar:"Invalid File Format"})
  }

  const postData= async(e)=>{
    
    e.preventDefault()
    if(errors.Avatar==="")
    {
    const {Name,Email,Phone,Address,City,State,Password,Avatar}=formData;
  
    const res = await fetch("/api/seller/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify
    ({
        Name,Email,Phone,Address,City,State,Password,Avatar
    })
  
  })


  const data = await res.json()
  if(res.status===200)
  {
    

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     
      });
          
    setErrors({Name: '',
    Phone: '',
    Address: '',
    Email: '',
    City: '',
    State: '',
    Password:'',
    Avatar: '',
    database:"",


})

setTimeout(() => {
  window.location.href='/Seller'
}, 5000);
    
  }
  else
  {
    for(let i =0;i<data.error.length;i++)
    {
      if(data.error[i].path==="Name")
        name="** "+data.error[i].msg
      
      else if(data.error[i].path==="Email")
        email ="** "+data.error[i].msg

      else if(data.error[i].path==="Password")
       password="** "+data.error[i].msg
      
      else if(data.error[i].path==="Address")
        address="** "+data.error[i].msg
      
      else if(data.error[i].path==="City")
       city="** "+data.error[i].msg
      
      else if(data.error[i].path==="State")
        state="** "+data.error[i].msg
      
      else if(data.error[i].path==="Phone")
        phone="** "+data.error[i].msg
      else if(data.error[i].path==="Database")
        database="** "+data.error[i].msg
      
    }
      setErrors({
        Name:name,
        Email:email,
        Address:address,
        City:city,
        State:state,
        Phone:phone,
        Password:password,
        database:database,
      })

      
  }

  }
}

  return (
    <div>
    <Navbar></Navbar>
    <ToastContainer/>
  <div className="container mx-auto mt-10 " style={{ maxWidth: '70%' }}>

      <div className=" rounded shadow-lg p-4 px-4 md:p-8 mb-6 bg-headings">
        <div className="grid gap-6 gap-y-2 text-sm grid-cols-1 bg-headings">
          <div className="text-white">
            <p className="font-semibold lg:font-medium xl:font-bold text-xl lg:text-2xl xl:text-3xl">Register</p>
            <p className="mt-2">Please fill out all the fields.</p>
          
            <form method='Post' encType='multipart/form-data'>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-5 text-sm grid-cols-1 md:grid-cols-5">
            <span classNameName='"text-sm font-bold text-red-700 tracking-wide"'>{errors.database}</span>

              <div className="md:col-span-5">
                <label for="Name" className="text-lg">Full Name</label>
                <input  id="full_name" className="h-10 border mt-0.5 rounded px-4 w-full text-black bg-gray-50" type="text" name="Name"  placeholder="Name"  required  value={formData.Name}  onChange={handleInputChange}/>
                <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Name}</span>

              </div>

              <div className="md:col-span-5">
                <label for="email" className="text-lg">Email Address</label>
                <input  id="email" className="h-10 border mt-1 rounded px-4 w-full text-black bg-gray-50" type="email" name="Email" placeholder="Email" required value={formData.Email} onChange={handleInputChange} />
                <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Email}</span>

              </div>

              <div className="md:col-span-2">
                <label for="phone" className="text-lg">Phone No</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input type="number" name="Phone" placeholder="Phone" required  className="px-4 appearance-none outline-none text-black w-full bg-transparent" value={formData.Phone} onChange={handleInputChange}/>
              </div>
              <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Phone}</span>

              </div>


              <div className="md:col-span-2">
                <label for="address" className="text-lg">Address / Street</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input  id="address" className="px-4 appearance-none outline-none text-black w-full bg-transparent" type="text" name="Address" placeholder="Address" value={formData.Address} required  onChange={handleInputChange} />
              </div>
              <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Address}</span>

              </div>



              <div className="md:col-span-1">
                <label for="city" className="text-lg">City</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input  id="city" className="px-4 appearance-none outline-none text-black w-full bg-transparent" type="text" name="City"  placeholder="City"  requir  value={formData.City}  onChange={handleInputChange}/>
              </div>
              <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.City}</span>

              </div>


             

              <div className="md:col-span-2">
                <label for="state" className="text-lg">State / province</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input id="state"  className="px-4 appearance-none outline-none text-black w-full bg-transparent" type="text"
              required
              name="State"
              placeholder="State"
              value={formData.State}
              onChange={handleInputChange}/>

                </div>
                <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.State}</span>

              </div>

             

              <div className="md:col-span-2">
                <label for="state" className="text-lg">Password</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input id="state"  className="px-4 appearance-none outline-none text-black  w-full bg-transparent" type="password"  name="Password"  required  placeholder="Password"  value={formData.Password}  onChange={handleInputChange}  />
                </div>
                <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Password}</span>
              </div>

            <div classNameName="md:col-span-2">
            <label htmlFor="image" className="text-lg">Upload profile photo</label><br></br>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e)=>postDetails(e.target.files[0])}
             />
             
          </div>
          <span className='"text-sm font-bold text-red-700 tracking-wide"'>{errors.Avatar}</span>

          
          <div className="md:col-span-5 text-right">
            <div className="inline-flex items-end">
              <button className="bg-white hover:bg-white text-black text-md font-bold py-2 px-4 rounded" onClick={postData} type="register-submit">Submit</button>
            </div>
          </div>

        </div>
        </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default SellerRegister;
