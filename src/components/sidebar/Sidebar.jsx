
// import {
  // RssFeed,
  // Chat,
  // PlayCircleFilledOutlined,
  // Group,
  // Bookmark,
  // HelpOutline,
  // WorkOutline,
  // Event,
  // School,
// } from "@material-ui/icons";
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";
import "./sidebar.css";
// import LoadingBox from '../../components/loadingBox/LoadingBox';
// import MessageBox from '../../components/messageBox/MessageBox';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  listOrders } from '../../actions/orderActions';
// import { useState } from "react";

import {
  FaHome,
  // FaHashtag,
  // FaRegBell,
  FaRegEnvelope,
  // FaRegBookmark,
  FaCartPlus,
  FaUserAlt,
  FaClipboardList,
  FaExchangeAlt,
  // FaUserCircle,
  // FaUserAstronaut,
  // FaCgProfile,
  // FaMehBlank,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios  from 'axios';

  const Sidebar = ({history}) => {

    const dispatch = useDispatch();
    // console.log(history);
    // const [active, setActive] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { user: loggedInUser } = userSignin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const backend_url = process.env.REACT_APP_API;
    // const [conversations, setConversations] = useState([]);
    // const [messages, setMessages] = useState([]);
    const [totalunread, setTotalUnread] = useState(null);

    useEffect(()=>{


      dispatch(listOrders({ seller: loggedInUser ? loggedInUser._id : '' }));

      const getTotalUnread = async() => {

        try {
           
          const convos = await axios.get(`${backend_url}/api/conversations/` + loggedInUser._id);
          
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

          const res = await axios(`${backend_url}/api/messages/` + conversation._id);
          return (res.data.filter((m) => (m.isRead === false && m.sender !== loggedInUser._id))).length;

        } catch (err) {
          console.log(err);
        }
      }

      getTotalUnread();
      

    },[dispatch,loggedInUser, loggedInUser._id, totalunread, backend_url]);


  //   let countfiltered = orders.filter(function(element){
  //     return element.isPaid === false;
  // }).length


  
//   let countfiltered = orders.filter(element=>
        
//     element.isPaid === false
// ).length

  

    // console.log(orders)
    // console.log(countfiltered)

  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sideProfile">
              <div className="profile-photo">
                {/* <FaUserAstronaut className='icons logo-icon' /> */}
                  {/* <img src={logo} alt=""/> */}
                  <img
                  className="postProfileImg"
                  src={
                    loggedInUser.profilePicture
                      ? backend_url+loggedInUser.profilePicture
                      : `${backend_url}/images/person/noAvatar.png`
                  }
                  alt=""
                />
              </div>
              <div className="handle">
                  <h4>{loggedInUser.isSeller ? loggedInUser.seller.name : loggedInUser.username}</h4>
                  <p className="text-muted">
                      @{loggedInUser.username}
                  </p>
              </div>
          </div>
          <ul className="butt">
            <span className="mid">
            <li className={history.location.pathname === '/' ? 'menu-item active' : 'menu-item'}>
              <Link to='/'>
                <FaHome className='icons logo-icon' />
                Home
              </Link>
            </li>
            <li className={history.location.pathname === `/profile/${loggedInUser.username}` ? 'menu-item active' : 'menu-item'}>
              <Link to={`/profile/${loggedInUser.username}`}>
                <FaUserAlt className='icons' />
                Profile
              </Link>
            </li>
            <li className={history.location.pathname === `/messenger` ? 'menu-item active' : 'menu-item'}>
              <Link to='/messenger'>
                <FaRegEnvelope className='icons' />
                Message {totalunread > 0 && (
                      <span className="badge">{totalunread}</span>
                )}
              </Link>
            </li>

            <li className={history.location.pathname === `/cart` ? 'menu-item active' : 'menu-item'}>
              <Link to='/cart'>
                <FaCartPlus className='icons' />
                Cart  {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </li>


            {/* {( (loggedInUser.isSeller || loggedInUser.isAdmin) && 
            <li className={history.location.pathname === `/orderlist/seller` ? 'menu-item active' : 'menu-item'}>
              <Link to='orderlist/seller'>
              <FaClipboardList className='icons' />
                Ordered Item  {orders.length > 0 && (
                      <span className="badge">{orders.length}</span>
                )}
              </Link>
            </li>
              )} */}


          {( (loggedInUser.isSeller || loggedInUser.isAdmin) && 
          <li className={history.location.pathname === `/orderlist/seller` ? 'menu-item active' : 'menu-item'}>
            <Link to='orderlist/seller'>
            < FaClipboardList className='icons' />
        <>
           
              {loading ? (
                  <span> Order</span>
              ) : error ? (
                <span> Order</span>
              ) : (

                <span>

                     Order {(orders.filter((m) => (m.isPaid === false))).length > 0 && (
                   <span className="badge">{(orders.filter((m) => (m.isPaid === false))).length}</span>
                     )} 
              
                </span>


              
             
                )}

         

        </>
          
            </Link>
          </li>
            )}
            <li className={history.location.pathname === `/orderhistory` ? 'menu-item active' : 'menu-item'}>
              <Link to='/orderhistory'>
                <FaExchangeAlt className='icons' />
                OrderHistory
              </Link>
            </li>
          
            {/* <li>
              <a href='/#'>
                <FaRegBell className='icons' />
                Notifications
              </a>
            </li> */}
            
            
          
            {/* <li>
              <Link to='/admin'>
                <FaUserAlt className='icons' />
                Seller Admin Portal
              </Link>
            </li> */}
          
            <li>
              {/* <a href='/#'>
                <FaMehBlank className='icons' />
                More
              </a> */}
            </li>
            {/* <div className='sidebar__Btn'>
              <a href="/#">Profile</a>
            </div> */}
            </span>

          </ul>


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






export default withRouter(Sidebar);
