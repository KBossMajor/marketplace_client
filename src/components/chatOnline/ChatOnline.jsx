import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const backend_url = process.env.REACT_APP_API;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${backend_url}/api/users/friends/` + currentId);
      setFriends(res.data);
    };
  
    getFriends();
  }, [currentId, backend_url]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
 
  const handleClick = async (user) => {
    // let receiverId = user._id
    try {
      const res = await axios.get(
        `${backend_url}/api/conversations/find/${currentId}/${user._id}`
      );
      // console.log(res.data)
      
      if(res.data){
        setCurrentChat(res.data)
      } else {
        let data = {
          senderId: currentId,
          receiverId: user._id
        }
        
        const newconvo = await axios.post(`${backend_url}/api/conversations`, data);
        setCurrentChat(newconvo.data);

      }
      // res.data ? setCurrentChat(res.data): setCurrentChat([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div key={o?._id}  className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? backend_url+o.profilePicture
                  : `${backend_url}/images/person/noAvatar.png`
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
