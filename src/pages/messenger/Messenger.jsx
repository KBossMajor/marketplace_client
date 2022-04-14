import "./messenger.css";
import styled from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar";
import Left from "../../components/left/Left";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router';
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
// import socketIOClient from 'socket.io-client';
import { useSelector } from "react-redux";


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const { receiverId } = useParams();
  const backend_url = process.env.REACT_APP_API;

  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;

  useEffect(() => {
    // socket.current = socketIOClient("http://localhost:8800");
    socket.current = io("http://127.0.0.1:8800");
    
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {

    const openMessagebox = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/conversations/find/${user._id}/${receiverId}`
        );
        // console.log(res.data)
        
        if(res.data){
          setCurrentChat(res.data)
        } else {
          let data = {
            senderId: user._id,
            receiverId: receiverId
          }
          
          const newconvo = await axios.post(`${backend_url}/api/conversations`, data);
          setCurrentChat(newconvo.data);
  
        }
        // res.data ? setCurrentChat(res.data): setCurrentChat([]);
      } catch (err) {
        console.log(err);
      }
    }
    
    if(receiverId){
      openMessagebox();
    }
    
   
    const getConversations = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/conversations/` + user._id);
        setConversations(res.data);  

      } catch (err) {
        console.log(err);
      }

    };

    getConversations();

  }, [user._id, receiverId, backend_url]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/messages/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, backend_url]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${backend_url}/api/messages/`, message); 
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      <Topbar />
      <Container>
      <Left />
      <Sidebar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={user} currentChat={currentChat} />
              </div>
            ))}
          </div>
        </div>  
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user._id} currentUser={user} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button> 
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
      </Container>
    </>
  );
}


const Container = styled.div`
 display: flex;
    width: 100%;
    background-color:#f5f5f5;
    padding-top: 20px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 20px;
`;