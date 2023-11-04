import React from 'react';
import Company_Sidebar from './Company_Sidebar';
import Company_Navbar from './Company_Navbar';
import phone from "../../../Images/phone_price.png"
import About_us from "../../../Images/About_us.jpg"
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
const Company_Cart = () => {
  
    return (
      <div>
        <Company_Navbar/>
        <Company_Sidebar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh', padding: '10vh' }}>
  {photosData.map(photo => (
    <div key={photo.id} style={{ display: 'flex', backgroundColor: 'rgb(152, 235, 152)', border: '0.1vh solid #ddd', padding: '5vh' }} className='devices' onClick={() => window.location.href = '/BuyRefurbished'}>
      <img src={photo.src} style={{ maxWidth: '100%', height: 'auto', borderRadius: '1vh', marginBottom: '5vh' }} />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vh', marginTop: '5vh' }}>
        <span style={{ fontWeight: 'bold' }}>{photo.name}</span>
        <span style={{ fontWeight: 'bold' }}>{photo.name1}</span>
      </div>
    </div>
  ))}
</div>
        </Company_Sidebar>
      </div>
    );
};

export default Company_Cart;