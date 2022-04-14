import "./closeFriend.css";

export default function CloseFriend({user}) {
  const backend_url = process.env.REACT_APP_API;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={backend_url+user.profilePicture} alt="" />
      <h5 className="sidebarFriendName">{user.username}</h5>
        <p>Lagos</p>
        <div className='sidebar__Btn'>
          <a href='/#'>Follow</a>
        </div>
      
    </li>
    
  );
}
