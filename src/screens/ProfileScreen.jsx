import "./ProfileScreen.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, updateUserProfile } from '../actions/userActions';
import { useHistory} from "react-router";
import axios from 'axios';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
// import {  useSelector } from 'react-redux';


export default function ProfileScreen() {


  const history = useHistory();
  

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [sellerCity, setSellerCity] = useState('');
  const [sellerCountry, setSellerCountry] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [coverPicture, setCoverPicture] = useState('');
  const [type_of_business, setType_of_Business] = useState('');
  const [aboutus, setAboutus] = useState('');
  const [service, setService] = useState('');
  // const [product, setProduct] = useState('');
  const [bgFirst, setBgFirst] = useState('');
  const [bgSecond, setBgSecond] = useState('');
  const [cpbgFirst, setCpbgFirst] = useState('');
  const [cpbgSecond, setCpbgSecond] = useState('');
  const [facebookhandle, setFacebookhandle] = useState('');
  const [twitterhandle, setTwitterhandle] = useState('');
  const [instagramhandle, setInstagramhandle] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;

  const { loading, error, user } = useSelector((state) => state.userInfo);

  const [loadingUploadP, setLoadingUploadP] = useState(false);
  // const [errorUploadP, setErrorUploadP] = useState('');

  const [loadingUploadBgFirst, setLoadingUploadBgFirst] = useState(false);
  const [loadingUploadBgSecond, setLoadingUploadBgSecond] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [activeTab, setActiveTab] = useState("FirstTab");

  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const handleTab1 = (e) => {
    // update the state to tab1
    setActiveTab(e);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: USER_UPDATE_PROFILE_RESET });
    if(successUpdate){
       alert('Profile Updated Successfully');
        
       history.push(`/profile/${username}`);
    }

    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(userInfo(loggedInUser._id));
    } else {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setUserName(user.username);
      setEmail(user.email);
      setProfilePicture(user.profilePicture);
      setCoverPicture(user.coverPicture);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
        setSellerAddress(user.seller.address);
        setSellerCity(user.seller.city);
        setSellerCountry(user.seller.country);
        setSellerPhone(user.seller.phone);
        setType_of_Business(user.seller.type_of_business);
        setAboutus(user.seller.aboutus);
        setService(user.seller.service);
        // setProduct(user.seller.product);
        setBgFirst(user.seller.bgFirst);
        setBgSecond(user.seller.bgSecond);
        setCpbgFirst(user.seller.cpbgFirst);
        setCpbgSecond(user.seller.cpbgSecond);
        setFacebookhandle(user.seller.facebookhandle);
        setTwitterhandle(user.seller.twitterhandle);
        setInstagramhandle(user.seller.instagramhandle);
      }
    }
  }, [dispatch, loggedInUser._id, user, successUpdate, username, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          username,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
          sellerAddress,
          sellerCity,
          sellerCountry,
          sellerPhone,
          profilePicture,
          coverPicture,
          type_of_business,
          aboutus,
          service,
          // product,
          bgFirst,
          bgSecond,
          cpbgFirst,
          cpbgSecond,
          facebookhandle,
          twitterhandle,
          instagramhandle
        })
      );
    }
    
  };

  console.log(username);

    const uploadFileHandler = async (e) => {
    console.log(e.target.id);
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);

    if(e.target.id === "profilePictureFile"){ 
      setLoadingUploadP(true);
    } else if(e.target.id === "coverPictureFile"){
      setLoadingUpload(true);
    } else if(e.target.id === "bgFirstFile"){
      setLoadingUploadBgFirst(true);
    } else if(e.target.id === "bgSecondFile"){
      setLoadingUploadBgSecond(true);
    }
    
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });

      if(e.target.id === "profilePictureFile"){
         setProfilePicture(data);
         setLoadingUploadP(false);
      } else if(e.target.id === "coverPictureFile"){
         setCoverPicture(data);
         setLoadingUpload(false);
      }  else if(e.target.id === "bgFirstFile"){
         setBgFirst(data);
         setLoadingUploadBgFirst(false);
     }  else if(e.target.id === "bgSecondFile"){
         setBgSecond(data);
         setLoadingUploadBgSecond(false);
   }

   

    
      
      
    } catch (error) {
      setErrorUpload(error.message);
      // setErrorUploadP(error.message);
      setLoadingUploadP(false);
      setLoadingUpload(false);
      setLoadingUploadBgFirst(false);
      setLoadingUploadBgSecond(false);
    //   console.log(error)
    }
  };

  return (
    <>
    <div className='mav'>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
           {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div className={activeTab === "FirstTab" ? "" : "first"}>
              <label htmlFor="name">User Name</label>
              <input
                id="name"
                className='fir'
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
            <div className={activeTab === "FirstTab" ? "" : "first"}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className='fir'
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className={activeTab === "FirstTab" ? "" : "first"}>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                id="profilePicture"
                className='fir'
                type="text"
                placeholder="Enter profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              ></input>
            </div>
            <div className={activeTab === "FirstTab" ? "" : "first"}>
              <label htmlFor="profilePictureFile">Profile Picture File</label>
              <input
                type="file"
                id="profilePictureFile"
                label="Choose profilePictureFile"
                onChange={uploadFileHandler}
              ></input>
              {loadingUploadP && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className={activeTab === "SecondTab" ? "" : "second"}>
              <label htmlFor="coverPicture">Cover Picture</label>
              <input
                id="coverPicture"
                type="text"
                className='fir'
                placeholder="Enter coverPicture"
                value={coverPicture}
                onChange={(e) => setCoverPicture(e.target.value)}
              ></input>
            </div>
            <div className={activeTab === "SecondTab" ? "" : "second"}>
              <label htmlFor="coverPictureFile">Cover Picture File</label>
              <input
                type="file"
                id="coverPictureFile"
                label="Choose coverPictureFile"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className={activeTab === "SecondTab" ? "" : "second"}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className='fir'
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className={activeTab === "SecondTab" ? "" : "second"}>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                className='fir'
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {/* <div className='third'>
              <h4>Additional Info</h4>
              <div className='third'>
                <label htmlFor="profile">Profile Picture</label>
                <input
                  id="profile"
                  type="file"
                  value={profilepix}
                  onChange={(e) => setProfilepix(e.target.value)}
                ></input>
              </div>
            </div> */}
            {user.isSeller && (
              <>
                <h2 className={activeTab === "ThirdTab" ? "sels" : "third sels"}>Seller</h2>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    className='fir'
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="type_of_business">Type of Business</label>
                  <input
                    id="type_of_business"
                    type="text"
                    className='fir'
                    placeholder="Enter Business Type"
                    value={type_of_business}
                    onChange={(e) => setType_of_Business(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    className='fir'
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="bgFirst">First Background Picture for the Seller Profile</label>
                  <input
                    id="bgFirst"
                    className='fir'
                    type="text"
                    placeholder="Enter First Background Pix"
                    value={bgFirst}
                    onChange={(e) => setBgFirst(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="bgFirstFile">First Background Picture File</label>
                  <input
                    type="file"
                    id="bgFirstFile"
                    label="Choose BgFirstFile"
                    onChange={uploadFileHandler}
                  ></input>
                  {loadingUploadBgFirst && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                   )}
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="bgSecond">Second Background Picture for the Seller Profile</label>
                  <input
                    id="bgSecond"
                    type="text"
                    className='fir'
                    placeholder="Enter Second Background Pix"
                    value={bgSecond}
                    onChange={(e) => setBgSecond(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="bgSecondFile">Second Background Picture File</label>
                  <input
                    type="file"
                    id="bgSecondFile"
                    label="Choose BgSecondFile"
                    onChange={uploadFileHandler}
                  ></input>
                  {loadingUploadBgSecond && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="cpbgFirst">Caption for First Background Picture</label>
                  <input
                    id="cpbgFirst"
                    type="text"
                    className='fir'
                    placeholder="Enter Caption for First Background Picture"
                    value={cpbgFirst}
                    onChange={(e) => setCpbgFirst(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ThirdTab" ? "" : "third"}>
                  <label htmlFor="cpbgSecond">Caption for Second Background Picture</label>
                  <input
                    id="cpbgSecond"
                    type="text"
                    className='fir'
                    placeholder="Enter Caption for Second Background Picture"
                    value={cpbgSecond}
                    onChange={(e) => setCpbgSecond(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="sellerAddress">Seller Address</label>
                  <input
                    id="sellerAddress"
                    type="text"
                    className='fir'
                    placeholder="Enter Seller Address"
                    value={sellerAddress}
                    onChange={(e) => setSellerAddress(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="sellerCity">Seller City</label>
                  <input
                    id="sellerCity"
                    type="text"
                    className='fir'
                    placeholder="Enter Seller City"
                    value={sellerCity}
                    onChange={(e) => setSellerCity(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="sellerCountry">Country</label>
                  <input
                    id="sellerCountry"
                    className='fir'
                    type="text"
                    placeholder="Enter Seller Country"
                    value={sellerCountry}
                    onChange={(e) => setSellerCountry(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="sellerPhone">Phone Number</label>
                  <input
                    id="sellerPhone"
                    type="tel"
                    className='fir'
                    placeholder="Enter Seller Phone Number"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="aboutus">About Us</label>
                  <input
                    id="aboutus"
                    type="text"
                    className='fir'
                    placeholder="Introduction about your company"
                    value={aboutus}
                    onChange={(e) => setAboutus(e.target.value)}
                  ></input>
                </div>
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="service">Service</label>
                  <input 
                    id="service"
                    type="text"
                    className='fir'
                    placeholder="Enter Your Service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  ></input>
                </div>
                {/* <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="product">Product</label>
                  <input
                    id="product"
                    type="text"
                    className='fir'
                    placeholder="Enter Your Products"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  ></input>
                </div> */}
                <div className={activeTab === "ForthTab" ? "" : "forth"}>
                  <label htmlFor="facebookhandle">Facebook Handle</label>
                  <input
                    id="facebookhandle"
                    type="url"
                    className='fir'
                    placeholder="Enter Your Facebook Handle"
                    value={facebookhandle}
                    onChange={(e) => setFacebookhandle(e.target.value)}
                  ></input>
                  <label htmlFor="twitterhandle">Twitter Handle</label>
                  <input
                    id="twitterhandle"
                    type="url"
                    className='fir'
                    placeholder="Enter Your Twitter Handle"
                    value={twitterhandle}
                    onChange={(e) => setTwitterhandle(e.target.value)}
                  ></input>
                  <label htmlFor="instagramhandle">Instagram Handle</label>
                  <input
                    id="instagramhandle"
                    type="url"
                    className='fir'
                    placeholder="Enter Your Instagram Handle"
                    value={instagramhandle}
                    onChange={(e) => setInstagramhandle(e.target.value)}
                  ></input>
                </div>

                
              </>
            )}
            <div>
              <label />
              <button className="las" type="submit">
                Update
              </button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
            </div>


            <ul className="nav det">
                <li
                  className={activeTab === "FirstTab" ? "active" : ""}
                  onClick={() => handleTab1('FirstTab')}
                >
                  1st Section
                </li>
                <li
                  className={activeTab === "SecondTab" ? "active" : ""}
                  onClick={() => handleTab1('SecondTab')}
                >
                  2nd Section
                </li>
                
                
                {/* {user.isAdmin || user.isSeller && ( */}

                {((user.isAdmin || user.isSeller)  && 
               <>
                <li
                  className={activeTab === "ThirdTab" ? "active" : ""}
                  onClick={() => handleTab1('ThirdTab')}
                >
                  3rd Section
                </li>
                <li
                  className={activeTab === "ForthTab" ? "active" : ""}
                  onClick={() => handleTab1('ForthTab')}
                >
                  4th Section
                </li>
                </>
                )} 
             
                
                
            </ul>
          </>
        )}
      </form>
    </div>
    </>
  );
}