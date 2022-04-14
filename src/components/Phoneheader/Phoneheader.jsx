import "./Phoneheader.css";
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
import { signout } from '../../actions/userActions';

export default function Topbar() {
  
   const dispatch = useDispatch();
   const signoutHandler = () => {
      dispatch(signout());
    };

    const backend_url = process.env.REACT_APP_API;

  return (
    <div className='PhonebarContainer'>
      
      <div className='PhonebarLeft'>

        <Link className='cover'  to='/' style={{ textDecoration: "none" }}>
          <span className='logo'>
          <img className="log" src={`${backend_url}/images/logo.png`} alt="" />
          </span>
        </Link>
      </div>
      
      <div className='PhonebarRight'>

      <Link className='coverlog'  to='/' style={{ textDecoration: "none" }}>
        <button className='logout' onClick={signoutHandler}>Logout</button>
      </Link>

        

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
