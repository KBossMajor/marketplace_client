import "./share.css";
import {
  PermMedia,
  // Label,
  // Room,
  // EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from 'react-redux';


import axios from "axios";
import LoadingBox from './../loadingBox/LoadingBox';

export default function Share() {
  // const { user } = useContext(AuthContext);
  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;

  const backend_url = process.env.REACT_APP_API;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    setLoading(true);
    if (file) {
        const res = new FormData();
        res.append("image", file);

        try {
          const { data } = await axios.post(`${backend_url}/api/uploads`, res, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.token}`,
            },
          });
          
          newPost.img = data;
          // setLoadingUpload(false);
        } catch (error) {
          // setErrorUpload(error.message);
          // setLoadingUpload(false);
          console.log(error)
        }

      console.log(newPost);
      // try {
      //   await axios.post("/api/upload", data);
      // } catch (err) {}
    }

    try {
      await axios.post(`${backend_url}/api/posts`, newPost);
      setLoading(false);
    } catch (err) {}

    window.location.reload();
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? backend_url+user.profilePicture
                : `${backend_url}/images/person/noAvatar.png`
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        {/* <hr className="shareHr" /> */}
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          
          </div>
          <button className="shareButton" type="submit" disabled={loading}>
            Share
          </button>
          {loading && <LoadingBox></LoadingBox>}
        </form>
        
      </div>
      
    </div>
  );
}
