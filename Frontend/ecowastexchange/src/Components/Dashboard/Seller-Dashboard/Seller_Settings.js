import React, { useState, useEffect } from "react";
import seller from "../../../Images/seller.jpg";
import "../../../Styles/Seller_Settings.css";
import Seller_Navbar from "./Seller_Navbar";

const Seller_Settings = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    Email: "",
    City: "",
    State: "",
    Avatar: null,
    avatarFile: null, // Added to store the selected avatar file
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth-token");
      const auth_token = JSON.parse(token);
      const res = await fetch("/api/seller/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: auth_token,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setFormData({
          Name: data.data.Name,
          Phone: data.data.Phone,
          Address: data.data.Address,
          Email: data.data.Email,
          City: data.data.City,
          State: data.data.State,
          Avatar: data.data.Avatar,
        });
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      Avatar: URL.createObjectURL(file),
      avatarFile: file,
    });
  };

  const handleEditProfile = async () => {
    if (editMode) {
      // Handle saving the profile changes, including avatar upload
      const token = localStorage.getItem("auth-token");
      const auth_token = JSON.parse(token);

      const formDataToSend = new FormData();
      formDataToSend.append("auth_token", auth_token);
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("Phone", formData.Phone);
      formDataToSend.append("Address", formData.Address);
      formDataToSend.append("Email", formData.Email);
      formDataToSend.append("City", formData.City);
      formDataToSend.append("State", formData.State);
      formDataToSend.append("Avatar", formData.avatarFile);

      const res = await fetch("/api/seller/profile", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.status === 200) {
        // Handle success, if needed
      } else {
        // Handle error, if needed
      }
    }

    // Toggle edit mode
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Seller_Navbar />
      <div className="sellersetting-container">
        <div className="photo">
          <label htmlFor="avatarInput">
            <img src={formData.Avatar} alt="" />
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={!editMode}
            />
          </label>
          <button
            type="button"
            className="login-submit"
            onClick={handleEditProfile}
          >
            {editMode ? "Save" : "Edit profile"}
          </button>
        </div>
        <div className="contact-form">
          <form action="index.html" autoComplete="off">
            <h3 className="title">User data</h3>
            <label htmlFor="">Seller Name</label>
            <div className="inputvalues-container">
              <input
                type="text"
                name="Name"
                value={formData.Name}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">Phone Number</label>
            <div className="inputvalues-container">
              <input
                type="tel"
                name="Phone"
                value={formData.Phone}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">Address</label>
            <div className="inputvalues-container textarea">
              <textarea
                name="Address"
                value={formData.Address}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <label htmlFor="">Email</label>
            <div className="inputvalues-container">
              <input
                type="email"
                name="Email"
                value={formData.Email}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">City</label>
            <div className="inputvalues-container">
              <input
                type="city"
                name="City"
                value={formData.City}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>

            <label htmlFor="">State</label>
            <div className="inputvalues-container">
              <input
                type="state"
                name="State"
                value={formData.State}
                className={`contact-input ${editMode ? 'editable' : ''}`}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Seller_Settings;