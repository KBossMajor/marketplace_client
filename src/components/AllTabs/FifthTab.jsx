import React from "react";
import {
  
  FaMapMarkerAlt,
  FaPhoneAlt,
  
} from "react-icons/fa";
const FifthTab = ({ user }) => {
  return (
    <div className="FifthTab bg-white">
      <div className="p-3">
        <h3 className="text-center fw-bolder">Our Services</h3>
        <section className="row">
          <div  className="col-6 mt-2">
            <h4 className="fw-bolder"><FaMapMarkerAlt className='v-icon' />Address</h4>
            <p>{user.seller.address}</p>
          </div>
          <div  className="col-6 mt-2">
            <h4  className="fw-bolder"><FaMapMarkerAlt className='v-icon' />Location</h4>
            <p>{user.seller.city}, {user.seller.country}</p>
          </div>
          <div  className="col-6 mt-2">
            <h4  className="fw-bolder"><FaPhoneAlt className='v-icon' />Phone</h4>
            <p>{user.seller.phone}</p>
          </div>
        </section>
        
       
        
      </div>
      
    
    </div>
  );
};
export default FifthTab;