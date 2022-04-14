import "./message.css";
import { format } from "timeago.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../actions/userActions";
import axios from 'axios';

export default function Message({ message, own, currentUser }) {

  const dispatch = useDispatch();

  
  const { user, loading } = useSelector((state) => state.userInfo);

  const backend_url = process.env.REACT_APP_API;

  useEffect(() => {

    if(message.sender !== currentUser._id){
       dispatch(userInfo(message.sender));
    }
    

  }, [dispatch, message.sender, currentUser._id])
  

  useEffect(()=> {

    const updateMessage = async () => {
      try {
       if(message.isRead === false && message.sender !== currentUser._id){
         const res = await axios.put(`${backend_url}/api/messages/` + message._id);
         console.log(res.data);
       }
        
      } catch (err) {
        console.log(err);
      }
    };

    updateMessage();

  }, [message, currentUser._id, backend_url]) 


  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src={ own ? backend_url+currentUser.profilePicture : loading ? " " : backend_url+user.profilePicture }
          alt=""
        /> */}
        {own ? <img
          className="messageImg"
          src={ currentUser.profilePicture ? backend_url+currentUser.profilePicture : `${backend_url}/images/person/noAvatar.png`}
          alt=""
        />: <img
        className="messageImg"
        src={ loading ? " " : user.profilePicture ? backend_url+user.profilePicture : `${backend_url}/images/person/noAvatar.png`}
        alt=""
      /> }
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
