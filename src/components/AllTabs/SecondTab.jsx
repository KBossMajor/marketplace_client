import React from "react";
// import { userDetails } from './../../actions/userActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from "react";
// import { useParams } from "react-router";

const SecondTab = ({ user }) => {


  // const dispatch = useDispatch();


  // const { user } = useSelector((state) => state.userDetails);


  // useEffect(() => {
  //   dispatch(userDetails({username}));
     
  // }, [username, dispatch]);


  // console.log(user)

  return (
    <div className=" SecondTab bg-white">
      <div className="p-3">
      <h3 className="text-center fw-bolder">Who We Are</h3>
      <p  className="text-center">{user.seller.description}</p>


      </div>
      
      {/* Second  tab content will go here */}
    </div>
    
  );
  
};

export default SecondTab;

