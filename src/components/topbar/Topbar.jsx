import "./topbar.css";
// import { 
  // Search, 
  // Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from 'react-redux';
import { signout } from './../../actions/userActions';
import { useState } from "react";

import {
  // FaHome,
  FaHashtag,
  // FaRegBell,
  // FaRegEnvelope,
  // FaRegBookmark,
  // FaCartPlus,
  // FaUserAlt,
  FaSignOutAlt,
  FaEllipsisH,
  FaDoorOpen,
  FaUserPlus,
  FaExchangeAlt,
  FaClipboardList,
  // FaUserCircle,
  // FaUserAstronaut,
  // FaCgProfile,
  // FaMehBlank,
} from "react-icons/fa";

export default function Topbar() {
  // const [show, setShow] = useState(false);
  // const { user } = useContext(AuthContext);
  // const userSignin = useSelector((state) => state.userSignin);
  // const { user } = userSignin;
  const [icons, setIcons] = useState(true);

  const backend_url = process.env.REACT_APP_API;
  // const handleBarOnClick = () => {
    // props.onclick();
  // };
  const toggleIcons = () => {
    if (icons=== true) {
      setIcons(false);
    }else{
      setIcons(true)
    }
  }

   const dispatch = useDispatch();
   const signoutHandler = () => {
      dispatch(signout());

      // const userSignin = useSelector((state) => state.userSignin);
      // const { user: loggedInUser } = userSignin;
  
      // const cart = useSelector((state) => state.cart);
      // const { cartItems } = cart;
    };

  return (
    <div className='topbarContainer'>
      
      <div className='topbarLeft'>
        {/* <GiHamburgerMenu className='headerSvg' onClick={handleBarOnClick} /> */}

        <Link className='cover'  to='/' style={{ textDecoration: "none" }}>
          <span className='logo'>
          <img className="logos" src={`${backend_url}/images/logo.png`} alt="" />
          </span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchSide'>
          {/* <Search className='searchIcon' /> */}
          {/* <input
            placeholder='Search for friend, post or video'
            className='searchInput searchIcon'
          /> */}
        </div>
       
      </div>
      <div className='topbarRight'>

        <Link className="explore" to='/homestore'>
        <FaHashtag className='exp' />
            Explore
        </Link>
      <Link className='coverlog'  to='/' style={{ textDecoration: "none" }}>
        <button className='logout' onClick={signoutHandler}>
         <FaDoorOpen className='ilogout' />
          Logout
         </button>
      </Link>

      <div className='phoneSize'>
          {/* <li className="topbarIcons lin">
            <Link to='/'>
              <FaHome className='icons logo-icon' />
            </Link>
          </li> */}
          <li className="topbarIcons lin">
            <Link to='/homestore'>
              <FaUserPlus className='icons' />            
            </Link>
          </li>
          <li className="topbarIcons lin">
                  <Link to='orderlist/seller'>
                    <FaClipboardList className='icons' />
                  </Link>
                </li>
          {/* <li className="topbarIcons lin">
            <a href='/#'>
              <FaRegBell className='icons' />             
            </a>
          </li> */}
          <li className="topbarIcons lin ">
            <a href='/#'>
              <FaEllipsisH onClick={toggleIcons} className='icons ' />             
            </a>
            <div className="submenus">
              <ul className={icons === true ? 'sub cob' : 'sub'}>
                
                <li className="topbarIcons lin">
                  <Link to='/orderhistory'>
                    <FaExchangeAlt className='icons' />
                        
                  </Link>
                </li>
                {/* <li className="topbarIcons lin">
                  <Link to={`/profile/${loggedInUser.username}`}>
                    <FaUserAlt className='icons' />
                    
                  </Link>
                </li> */}
                <li className="topbarIcons lin">
                  <Link onClick={signoutHandler}>
                    <FaSignOutAlt className='icons' />
                  </Link>
                </li>
              </ul>
            </div>

          </li>



      </div>

        {/* <div className='topbarLinks'>
          <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Person />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <Chat />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>1</span>
          </div>
        </div> */}
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=''
            className='topbarImg'
            onClick={() => {
              setShow(!show);
              console.log(show);
            }}
          />
        </Link> */}
        {/* <div className={show ? "menu " : "menu toggleMenu"}>
          <li>
            {" "}
            <a href='/#'>Profile</a>
          </li>
          <li>
            <a href='/#'>Log Out</a>
          </li>
        </div> */}
      </div>

    </div>
    
  );
}
