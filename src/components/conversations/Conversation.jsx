import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, currentChat }) {
  const [user, setUser] = useState(null);
  const [unread, setUnread] = useState(null);
  const backend_url = process.env.REACT_APP_API;



  // console.log(currentChat, conversation);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${backend_url}/api/users?userId=` + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUnread = async () => {
      try {
        const res = await axios(`${backend_url}/api/messages/` + conversation._id);
        // console.log(res.data.filter((m) => (m.isRead === false && m._id !== currentUser._id)));
        setUnread((res.data.filter((m) => (m.isRead === false && m.sender !== currentUser._id))).length);
      } catch (err) {
        console.log(err);
      }
    }
    
    getUser();
    getUnread();
    
  }, [currentUser, conversation ,backend_url]);

  useEffect(() => { 
     if(conversation._id === currentChat?._id){
       setUnread(null);
     }
  }, [currentChat?._id, conversation._id,]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? backend_url+user.profilePicture
            : `${backend_url}/images/person/noAvatar.png`
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
      <span className={unread > 0 ? "badge" : ""}>{unread > 0 && unread}</span>
    </div>
  );
}
