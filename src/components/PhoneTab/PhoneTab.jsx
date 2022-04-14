
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
import "./PhoneTab.css";
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useState } from "react";

import {
  FaHome,
  FaHashtag,
//   FaClipboardList,
  // FaRegBell,
  FaRegEnvelope,
//   FaRegBookmark,
  FaCartPlus,
  FaUserAlt,
  // FaUserCircle,
  // FaUserAstronaut,
  // FaCgProfile,
  // FaMehBlank,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios  from 'axios';

  const Sidebar = ({history}) => {
    // console.log(history);
    // const [active, setActive] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { user: loggedInUser } = userSignin;

   
  

    // const [conversations, setConversations] = useState([]);
    // const [messages, setMessages] = useState([]);
    const [totalunread, setTotalUnread] = useState(null);

    const backend_url = process.env.REACT_APP_API;

    useEffect(()=>{

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
      

    },[loggedInUser._id, totalunread, backend_url]);

    // console.log(orders)
    

  return (
    <>
      <div className="phonebar fixed-bottom">
            <div className="container_phone">
                <div className="phone_menu">
                    <li className="nav__listitem nav__listitem-active">
                        <Link to='/'>
                            <FaHome className='phone_icon' />
                        </Link>
                    </li>

                    <li className="nav__listitem ">
                        <Link to='/homestore'>
                            <FaHashtag className='phone_icon' />
                        </Link>
                    </li>

                    <li className="nav__listitem ">
                        <Link to='/cart'>
                            <FaCartPlus className='phone_icon' />
                        </Link>
                    </li>

                    <li className="nav__listitem">
                        <Link to='/messenger'>
                            <FaRegEnvelope className='phone_icon' />
                        </Link>
                    </li>

                    <li className="nav__listitem">
                        <Link to='/profile'>
                            <FaUserAlt className='phone_icon' />
                        </Link>
                    </li>
                      
                </div>
            </div>
      </div>
    </>
  );
}



export default withRouter(Sidebar);
