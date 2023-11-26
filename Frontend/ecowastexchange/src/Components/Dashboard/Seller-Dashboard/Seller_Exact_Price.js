import React from 'react';
import '../../../Styles/Seller_Exact_Price.css';
import Seller_Navbar from './Seller_Navbar';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Exact_Price() {
  const [formData, setFormData] = useState({
    Name: '',
    SellingPrice: '',
    Avatar: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("product-token");

      const res = await fetch('/api/product/exactPrice', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_token: token
        })
      });

      const data = await res.json();
      if (res.status === 200) {
        setFormData({
          Name: data.data.Name,
          SellingPrice: data.data.SellingPrice,
          Avatar: data.data.Avatar,
        });
      }
    };

    fetchUser();
  }, []);

  const handleSell = async () => {
    const token = localStorage.getItem("product-token");

    const res = await fetch('/api/product/sell', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        product_token: token
      })
    });

    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      window.location.href = '/SellerHome';
    } else {
      toast.error(data.error);
    }
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("product-token");
    setFormData({ ...formData, SellingPrice: userInput });
    const { SellingPrice } = formData;

    const res = await fetch('/api/seller/sellerSellingPrice', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_token: token,
        SellingPrice,
      })
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }

    closeModal();
  };

  return (
    <div>
      <Seller_Navbar />
      <div className='product-image'>
        <img src={formData.Avatar} alt="Product Avatar" />
      </div>
      <div className='item-container'>
        <div className='device-name'>
          <h1>{formData.Name}</h1>
          <h3>Selling Price:</h3>
          <br></br>
          <h1 style={{ "color": "red" }}>{formData.SellingPrice}</h1>
          <button className='editname' onClick={openModal}>Edit</button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Input Modal"
            className="centered-modal"
          >
            <div className="modal-container">
              <h2 style={{ textAlign: 'center' }}>Enter Selling Price:</h2>
              <form>
                <input
                  type="text"
                  className='inputtext'
                  value={userInput}
                  onChange={handleInputChange}
                /><br></br>
                <button type="submit" className='editsubmitbutton' onClick={handleFormSubmit}>Submit</button>
                <br></br>
                <button className='editcancelbutton' onClick={closeModal}>Cancel</button>
              </form>
            </div>
          </Modal>

          <br></br>
          <button className='sellbutton' onClick={handleSell}>Sell</button>
          <br></br>
          <text>Fast <br></br>Payments</text>
          <div className="verticalline"></div>
          <div className="textclass">
            <text>100% Safe</text>
          </div>
        </div>
      </div>
      <div className='faq'>
        <h1>FAQ's</h1>
      </div>
      <div className="accordion">
        {/* ... existing code */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Exact_Price;
