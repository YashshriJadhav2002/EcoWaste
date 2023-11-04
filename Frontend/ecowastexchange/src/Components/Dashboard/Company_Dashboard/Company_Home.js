import React, { useEffect } from 'react';
import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"

import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import '../../../Styles/Seller_Navbar.css';

const photosData = [
  { id: 1, src: phone, name: 'Photo 1',name1:'Rs.30000' },
  { id: 2, src: phone, name: 'Photo 2',name1:'Rs.30000' },
  { id: 3, src: About_us, name: 'Photo 3',name1:'Rs.30000' },
  { id: 4, src: phone, name: 'Photo 4',name1:'Rs.30000' },
  { id: 5, src: phone, name: 'Photo 1',name1:'Rs.30000' },
  { id: 6, src: phone, name: 'Photo 2',name1:'Rs.30000' },
  { id: 7, src: About_us, name: 'Photo 3',name1:'Rs.30000' },
  { id: 8, src: phone, name: 'Photo 4',name1:'Rs.30000' },
  



  // Add more photo objects as needed
];

const Company_Home = () => {


    return (
      <div>
       <Company_Navbar> </Company_Navbar>
      <Company_Sidebar> 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }} >
      {photosData.map(photo => (
        <div key={photo.id} style={{ backgroundColor: '#fff', border: '0.1vh solid #ddd', padding: '5vh', textAlign: 'center' }} className='devices' onClick={() =>window.location.href = '/CompanyBuyRefurbished'}>
          <img src={photo.src} alt={photo.name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
          <div style={{ fontWeight: 'bold' }}>{photo.name}</div>
          <div style={{ fontWeight: 'bold' }}>{photo.name1}</div>

        </div>
      ))}
    </div>
      
      </Company_Sidebar>
    </div>
    );
};

export default Company_Home;