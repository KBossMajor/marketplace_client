import React from "react";
const FouthTab = ({ user }) =>{
  return (
    <div className="FouthTab bg-white">
      <div className="p-3">
        <h3 className="text-center fw-bolder">Our Services</h3>
        <p className="text-center ">{user.seller.service}</p>
    
      </div>
     
    </div>
  );
};
export default FouthTab;