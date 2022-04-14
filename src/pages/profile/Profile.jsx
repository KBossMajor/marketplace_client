import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { format } from "timeago.js";
// import Feed from "../../components/feed/Feed";
import Tab from "../../components/tab/Tab";
import Rightbar from "../../components/rightbar/Rightbar";
import Right from "../../components/right/Right";
import Left from "../../components/left/Left";
import  PhoneTab from "../../components/PhoneTab/PhoneTab";
import { useEffect } from "react";
import axios from "axios";
// import { detailsUserByName } from '../../actions/userActions';
import { PaystackButton } from 'react-paystack';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from './../../actions/userActions';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaStoreAlt,
  FaCalendarAlt,
  FaPencilAlt
} from "react-icons/fa";






export default function Profile() {
  const backend_url = process.env.REACT_APP_API;
  // const [user, setUser] = useState({});
  const username = useParams().username;

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userDetails);

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: loggedInUser.email,
    amount: 205000,
    publicKey: 'pk_test_c3e13ac501f69801dde3445fecdbbeca914d911c',
  };

  //call to confirm payment payment on paystack
  const confirm_payment = async(ref) => {
    // console.log(ref.reference);
    const { data } = await axios.get(`${backend_url}/api/payment/${loggedInUser._id}/${ref.reference}`);
    return data;
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // const { data } = await axios.get(`/api/payment/${}`);
    // console.log(reference);
    let res = confirm_payment(reference);
    console.log(res);

  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
      ...config,
      text: 'Subscribe Now',
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };
  
  useEffect(() => {
    dispatch(userDetails({username}));
     
  }, [username, dispatch]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Left />
        <Sidebar />
        {!loading && <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg" 
                src={
                  user.coverPicture
                    ? backend_url+user.coverPicture
                    : `${backend_url}/images/person/noCover.png`
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? backend_url+user.profilePicture
                    : `${backend_url}/images/person/noAvatar.png`
                }
                alt=""
              />

              {loggedInUser._id === user._id && (<button className="editbtn">
                  <Link to="/profilestore"><FaPencilAlt className='vicon' />Edit Profile</Link>
              </button>)}

              {/* {(loggedInUser._id === user._id && (user.isAdmin || user.isSeller)) && (<div className="aza">
                  <Link className="azas" to="/profilestore">Manage My Store </Link>
              </div>)} */}
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}<FaCheckCircle className='v-icon' /></h4>
              <span className="profileInfoDesc">
              
              <p>{user.seller.description}</p>
              </span>
              {/* <Link to="/profilestore">Edit Profile</Link> */}
            </div>
            <div className="profileDetails">
              <span className="ProfileLocation"><FaMapMarkerAlt className='v-icon' />{user.seller.city}, {user.seller.country}</span>
              <span className="ProfilejoinDate"><FaCalendarAlt className='v-icon' />{format(user.createdAt)}</span>
            </div>
            <div className="">
              <span className="DStore">
              {(user.isAdmin || user.isSeller) && (<Link to={`/seller/${user._id}`}><FaStoreAlt className='v-icon' />visit my store</Link>)}
              </span>
              <span className="">
                {loggedInUser._id === user._id && user.isSeller && (<PaystackButton className="DSubcribe" {...componentProps} />)}
              </span>
            </div>
            <div className="profilefollowing">
              <label className="pfollow"><span className="pnumber">{user.followings.length}</span>&nbsp;Following</label>
              <label className="pfollow"><span className="pnumber">{user.followers.length}</span>&nbsp;Followers</label>
            </div>
          </div>
          <div className="profileRightBott">
          {(user.isAdmin || user.isSeller) && (<Tab user={user}  />)}
            {/* <Feed username={username} /> */}
            {/* <Rightbar user={user} /> */}
          </div> 
        </div>}
        <Rightbar user={user}/>
        <Right />
      </div>
      <PhoneTab />
    </>
  );
}
