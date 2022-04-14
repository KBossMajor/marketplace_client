import React from "react";
import { Link } from 'react-router-dom';
import {
  FaStoreAlt,
} from "react-icons/fa";

const ThirdTab = ({ user }) =>{
  return (
    <div className="ThirdTab bg-white">
      <div className="p-3">
        <h3 className="text-center fw-bolder">Our Product</h3>
        <div className="d-flex justify-content-center">
          <span className="DStore p-2">
              {(user.isAdmin || user.isSeller) && (<Link to={`/seller/${user._id}`}><FaStoreAlt className='v-icon' />visit my store</Link>)}
          </span>

        </div>
        

      </div>
      
     
    </div>
  );
};
export default ThirdTab;