import "./rightbar.css";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../actions/userActions';
import axios from "axios";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
// import LoadingBox from './../loadingBox/LoadingBox';
// import {
//   FaGreaterThan
// } from "react-icons/fa";

export default function Rightbar({ user, setUpdate }) {
  const backend_url = process.env.REACT_APP_API;
  const [friends, setFriends] = useState([]);
  const [nonfriends, setNonFriends] = useState([]);
  const [processing, setProcessing] = useState(false);
  // const { user: currentUser, dispatch } = useContext(AuthContext);
  
  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;

  const { loading, user: currentUser } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${backend_url}/api/users/friends/` + loggedInUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    dispatch(userInfo(loggedInUser._id));
    
  }, [dispatch, loggedInUser._id, followed, backend_url]);

  useEffect(() => {
    const getNonFriends = async () => {
      try {
        const nonfriendList = await axios.get(`${backend_url}/api/users/nonfriends/` + loggedInUser._id);
        setNonFriends(nonfriendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNonFriends();
  }, [loggedInUser._id, processing, backend_url]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`${backend_url}/api/users/${user._id}/unfollow`, {
          userId: loggedInUser._id,
        });
        // dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${backend_url}/api/users/${user._id}/follow`, {
          userId: loggedInUser._id,
        });
        // dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

   const homeClick = async (friend) => {
    try {
        setProcessing(true);
        setUpdate(true);
        await axios.put(`${backend_url}/api/users/${friend._id}/follow`, {
          userId: loggedInUser._id,
        });

        setProcessing(false);
        setUpdate(false);
        
        // dispatch({ type: "FOLLOW", payload: user._id });
       // setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(followed)
  // console.log(loading)

  console.log(user);

  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        <img className="rightbar_Ad" src="/images/ad2.png" alt="" />
        <h4 className="rightbarTitle">Businesses to Follow</h4>
        <ul className="rightbarFriendList">
          {nonfriends.map((friend) => (
          
              <div className="rightbarFollowing" key={friend._id}>
                <img
                  src={
                    friend.profilePicture
                      ? backend_url+friend.profilePicture
                      : `${backend_url}/images/person/noAvatar.png`
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <div>
                    <Link
                      to={"/profile/" + friend.username}
                      style={{ textDecoration: "none" }}
                      key={friend._id}
                    > 
                      <div className="rightbarFollowingName">{friend.username}</div>
                     </Link>
                  <div className={friend.seller.type_of_business ? 'rightbarLocation' : 'rightbarLocation lon'}>{friend.seller.type_of_business}</div>
                  <div className={friend.seller.city || friend.seller.country ? 'rightbarLocation' : 'rightbarLocation lon'}>{friend.seller.city}, {friend.seller.country}</div>
                  <button className="rightbarFollowButton" onClick={()=>homeClick(friend)}>
                     Follow <Add style={{color: "#ffe0e0"}} />
                  </button>
                  {/* {processing && <LoadingBox></LoadingBox>} */}
                </div>
                 
              </div>
              
           
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {!loading && setFollowed(currentUser.followings.includes(user?._id))}
        {(user.username !== loggedInUser.username ) ? (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove style={{color: "#ffe0e0"}} /> : <Add  style={{color: "#ffe0e0"}} />}
          </button>
        ): ''}
        {/* <h4 className="rightbarTitle">User information</h4> */}
        <div className="rightbarInfo">
        <img className="rightbar_Ad" src="/images/ad2.png" alt="" />

          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Business Type:</span>
            <span className="rightbarInfoValue">{user.seller.type_of_business}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City, Country:</span>
            <span className="rightbarInfoValue">{user.seller.city}, {user.seller.country}</span>
          </div>  */}
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Business Type</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                  ? "Married"
                  : "-"}
            </span>
          </div> */}
        </div>
        <h4 className="rightbarTitle">Connections</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? backend_url+friend.profilePicture
                      : `${backend_url}/images/person/noAvatar.png`
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <div>
                  <div className="rightbarFollowingName">{friend.username}</div>
                  <div className="rightbarLocation">{friend.seller.type_of_business}</div>
                  <div className="rightbarLocation">{friend.seller.city}, {friend.seller.country}</div>
                </div>
              </div>
              
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
