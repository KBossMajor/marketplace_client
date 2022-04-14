import Rating from '../../components/Rating';
// import { useParams } from 'react-router';
import "./Sellersidebar.css";
// import React, { useEffect } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../actions/userActions';
import { useEffect, useState } from "react";
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import axios  from 'axios';
// import { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Room,


} from "@material-ui/icons";

import {
  // FaHome,
  // FaHashtag,
  // FaRegBell,
  // FaRegEnvelope,
  // FaRegBookmark,
  // FaCartPlus,
  // FaUserAlt,
  // FaUserCircle,
  // FaUserAstronaut,
  // FaCgProfile,
  // FaMehBlank,
} from "react-icons/fa";


  const SellerSidebar = (props) => {

   

    // const {id: sellerId} = useParams();
    const { products, loadingProducts, errorProducts, sellerId } = props;
    // const [rating, setRating] = useState(0);
    // console.log(user);
    // const [active, setActive] = useState(1);
    // const { loading, error, user } = useSelector((state) => state.userInfo);
    const   user  = useSelector((state) => state.userInfo);
    const userSignin = useSelector((state) => state.userSignin);
    const { user: loggedInUser } = userSignin;
    const { user: seller,  loading, error, } = user;

    // const cart = useSelector((state) => state.cart);
    // const { cartItems } = cart;
    const backend_url = process.env.REACT_APP_API;
    // const [conversations, setConversations] = useState([]);
    // const [messages, setMessages] = useState([]);
    const [totalunread, setTotalUnread] = useState(null);

    // const [followed, setFollowed] = useState(null);


    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo(sellerId));
    // dispatch(userInfo(loggedInUser._id));
  }, [dispatch, sellerId]);

  console.log(seller);
  // console.log(seller);
  // console.log(loading, error);
  // console.log(products);

    useEffect(()=>{

      const getTotalUnread = async() => {

        try {
           
          const convos = await axios.get("/api/conversations/" + loggedInUser._id);
          
          // setConversations(convo.data); 

          // console.log('convo', convos.data);

          const message = await Promise.all(
            
            convos.data.map((convo) => {
              return getUnread(convo)
            })

          );

          // console.log('message', message);
          
          // setMessages(message);
           
          setTotalUnread(message.reduce((a, c)=>{
            return a+c;
            
          }, 0))

          // console.log(totalunread)


        } catch (err) {
          console.log(err);
        }
     
      }

      const getUnread = async (conversation) => {
        try {

          const res = await axios("/api/messages/" + conversation._id);
          return (res.data.filter((m) => (m.isRead === false && m.sender !== loggedInUser._id))).length;

        } catch (err) {
          console.log(err);
        }
      }

      getTotalUnread();
      

    },[loggedInUser._id, totalunread]);


    const handleClick = async () => {
      try {
        // setFollowed(seller.followers.includes(seller?._id))
        // console.log(followed)

        if (seller.followers.includes(seller?._id)) {
          await axios.put(`/api/users/${loggedInUser._id}/unfollow`, {
            userId: loggedInUser._id,
          });
          // dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`/api/users/${loggedInUser._id}/unppfollow`, {
            // userId: loggedInUser._id,
          });
          // dispatch({ type: "FOLLOW", payload: user._id });
        }
        // setFollowed(!seller.followers.includes(seller?._id));
      } catch (err) {
      }
    };

    // console.log(loggedInUser._id)

  return (
     <> 
    <div className="sellerSidebar">
      <div className="sellerWrapper">
        <div className="sellerProfile">
          <>
          {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
          <div>
            <div className="seller-photo mb-4 d-flex justify-content-center">
              
                <img
                className="sellerProfileImg"
                src={
                  seller.profilePicture
                    ? backend_url+seller.profilePicture
                    : `${backend_url}/images/person/noAvatar.png`
                }
                alt=""
              />
            </div>
            
           
            <div className="seller-detail ">
               
                <h4 className="mb-4">{seller.seller.name}</h4>
                <div className="seller-username">
                   <span className="mb-4"> @{seller.username} </span>
                   <span> 
                    <Rating  rating ={seller.seller.rating} 
                      numReviews={seller.seller.numReviews}/>
                      
                
                </span>
                </div>

                <>
                  {(seller.seller.city && seller.seller.country && 

                  <div style={{marginBottom:"10px"}}>
                    <span>
                    <Room style={{marginRight:"10px",FontSize:"60px"}}/>
                    {seller.seller.city} {seller.seller.country}

                    </span>

                    
                  </div>
                  )}
                </>
                 
             </div>


                {/* <div className="">
                <button type="button" className="btn btn-outline-success">Success</button>
                </div> */}

           </div>

           
           
        )} 
        </>

        {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (

              <div className="social-detail" >
                {/* {console.log(seller.followers.includes(loggedInUser?._id))} */}
                {/* {console.log(followed)} */}
              {/* {loading && setFollowed(seller.followings.includes(loggedInUser?._id))} */}
              {(seller.username !== loggedInUser.username ) ? (
                 < button className="but sp-1" onClick={handleClick}>
                   {seller.followers.includes(loggedInUser?._id) ? "Unfollow" : "Follow"}
                  </button>


                ): < button className="but sp-1">Follow11</button>}
                <Link to={`/messenger/${sellerId}`}>< button className="but">Message</button></Link>
              </div>
         

            )}
          
           <>
          
            
              <div className="social-count" >

              {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
            
                <div className="follower-count sp-2" >
                  
                  <div className="social-count-name">
                  Follower
                  </div>
                  <div className="social-number">
                    {seller.followers
                        ? seller.followers.length
                        : 0}
                  
                  </div>
              </div>
              
              )} 
              
              
                    <>
                        {loadingProducts ? (
                        <LoadingBox></LoadingBox>
                      ) : errorProducts ? (
                        <MessageBox variant="danger">{errorProducts}</MessageBox>
                      ) : (

                          <div className="follower-count" >
                            <div className="social-count-name" >
                            Product
                            </div>
                            <div className="social-number" >

                            {products.length
                                  ? products.length
                                  : 0}
                            
                            </div>
                          </div>
                      )}
                  </>
              </div>
          
           </>


         

          <div>
          {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (

              <div class="wrapper">
                  <div class="icon facebook">
                    <div class="tooltip">Facebook</div>
                    <Facebook style={{ color: "black", fontSize: 25}}  />
                  </div>
                  <div class="icon twitter">
                    <div class="tooltip">Twitter</div>
                    <Twitter style={{ color: "black", fontSize: 25}}  />
                  </div>
                  <div class="icon instagram">
                    <div class="tooltip">Instagram</div>
                    <Instagram style={{ color: "black", fontSize: 25}}  />
                  </div>
                 
              </div>

               )}
          </div>

      


     
           
        </div>
    


        {/* <button className="sidebarButton">Show More</button> */}
        {/* <hr className="sidebarHr" /> */}
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}

       
      </div>
    </div>
     </>
  );
}



export default withRouter(SellerSidebar);
