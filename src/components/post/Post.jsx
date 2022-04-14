import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {

FaRegEdit,
FaTrashAlt,
FaCommentDots,

  
} from "react-icons/fa";
import {
  PermMedia,
  // Label,
  // Room,
  // EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { createComment } from "../../actions/postActions";
import { POST_COMMENT_CREATE_RESET } from "../../constants/postConstants";
import LoadingBox from "../loadingBox/LoadingBox";
import MessageBox from "../messageBox/MessageBox";

// import {   
// MdSend


// } from "react-icons/md";

export default function Post({ post }) {
  const desc = useRef();
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false); 
  const [user, setUser] = useState({});
  const [icon, setIcon] = useState(true);
  const [comment, setComment] = useState('');
  const [view, setView] = useState(post.comments.slice(-2));
  const [editmodal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);


  const backend_url = process.env.REACT_APP_API;
  
  const {user: currentUser } = useSelector((state) => state.userSignin);

  const postCommentCreate = useSelector((state) => state.postCommentCreate);
    const {
      loading: loadingCommentCreate,
      error: errorCommentCreate,
      success: successCommentCreate,
      // comment_length: commentLengthCreate,
    } = postCommentCreate;

  const toggleIcon = () => {
    if (icon=== true) {
      setIcon(false);
    }else{
      setIcon(true)
    }
  }
  const toggleModal =() => {
    setModal(!editmodal)
    // console.log(modal);
  }
  // if (modal) {
  //   document.body.classList.add('active-modal')
  // }else{
  //   document.body.classList.remove('active-modal')

  // }
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // console.log(post.comments.slice(view.length % 1));

  const viewMore = () => {
    if (view.length === 2) {
      // console.log(view.length)
    setView(post.comments)
      
    }else{
      setView(post.comments.slice(-2))
      // console.log(view.length)
    }
  }
 

  useEffect(() => {

    const fetchUser = async () => {
      const res = await axios.get(`${backend_url}/api/users?userId=${post.userId}`);
      setUser(res.data);
      // setComment(res.data);
      // setView(res.data);
     
    };
    
    fetchUser();
    
  }, [dispatch, post.userId, successCommentCreate, backend_url]);

  useEffect(() => {
    if (successCommentCreate) {
      dispatch({ type: POST_COMMENT_CREATE_RESET });
      setComment('');
      // updatePost();
      // window.alert('Comment Submitted Successfully');
    }

  }, [successCommentCreate, dispatch,])

  const likeHandler = () => {
    try {
      axios.put(`${backend_url}/api/posts/` + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    // socket.emit("sendNotification", {
    //   senderName: user,
    //   receiverName: post.username,
    //   type,
    // });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        createComment(post._id, { comment, name: currentUser.name })
      );
    } else {
      alert('Please enter a comment');
    }
  };


  const editPost = async (e) => {
    e.preventDefault();
    const editPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };
    setLoading(true);
    if (edit) {
        const res = new FormData();
        res.append("image", edit);

        try {
          const { data } = await axios.post(`${backend_url}/api/uploads`, res, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          
          editPost.img = data;

          // setLoadingUpload(false);
        } catch (error) {
          // setErrorUpload(error.message);
          // setLoadingUpload(false);
          console.log(error)
        }

      console.log(editPost);
      // try {
      //   await axios.post("/api/upload", data);
      // } catch (err) {}
    }

    try {
      await axios.put(`${backend_url}/api/posts/${post._id}`, editPost);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }

    window.location.reload();
  };


  const deletePost = async (id) => {

    const deleteObj = {
      userId: currentUser._id,
  
    };

    const confirm = window.confirm(
      "Do you really want to delete this Post?"
    )


    if(!confirm) {
      return false;
    }

    try {
      let res = await axios.put(`${backend_url}/api/posts/${id}/delete`, deleteObj);
      alert("Post successfully deleted")
      console.log(res.data)
      window.location.reload();
      
    } catch (err) {
      console.log(err)
    }


  }


  return (
    <div>
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <><Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? backend_url+user.profilePicture
                    : `${backend_url}/images/person/noAvatar.png`
                }
                alt=""
              />
            </Link> 
            <div>
              
              <div className="postUsername">
                <Link  className="user_text" to={`/profile/${user.username}`}>
                  {user.username}
                </Link>
              </div>
             
            <small className="postDate">{format(post.createdAt)}</small>
            </div>
            </> 
          </div>
          
          <div className="postTopRight postbarIcons ">
            <MoreVert className="zaa" onClick={toggleIcon} />
            {currentUser._id === post.userId && <div className="submenu">
              <ul className={icon === true ? 'sub cons' : 'sub'}>
                <li className="topbarIcons lin">
                  <Link onClick={toggleModal} className="text-col" to=''>
                    <FaRegEdit className='icons saq'  />
                   <span>Edit</span> 
                  </Link>
                 
                </li>
                <li className="topbarIcons post_lin">
                  <Link onClick={() => deletePost(post._id)} className="text-col" to=''>
                    <FaTrashAlt className='icons saq'  />
                      Delete
                  </Link>
                  
                </li>
                
              </ul>
            </div>}
          </div>
        </div>
        <div className="postCenter">
          
          <img className="postImg" src={backend_url+post.img} alt="" />
          <div className="postText mt-4">{post?.desc}</div>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? <img
              className="likeIcon"
              src={`${backend_url}/images/like.png`}
              onClick={likeHandler}
              alt=""
            />
            :
            <img
              className="likeIcon"
              src={`${backend_url}/images/unlike.png`}
              onClick={likeHandler}
              alt=""
            />}
            <span className="postLikeCounter">{isLiked ? `You and ${like-1} other people liked it`
	          : `${like} other people liked it`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"  onClick={viewMore}>{ post.comments.length } comments <FaCommentDots className='ico' /></span>
          </div>
        </div>
      </div>

        
    </div>

    <div className='viu'>
    {view.map((item) => (
    <div key={item._id}>
      <div className='cax'>
        <img className='postProfileImg' src={`${backend_url}/images/person/noAvatar.png`} alt="img" />
        <div className='comm'>
        
            <div className="postUsername">{item.name}</div>
            <p>{item.comment}
           
            

            </p>
        
        </div>
      </div>
      </div>
        ))}
        <div>
      {!post.comments.length  ? '' : <p className='reply' onClick={viewMore}>{view.length === 2 ? 'view all comments' : 'view less'}</p>}
      </div>
    </div>


    <div>
      <form className="work" onSubmit={submitHandler}>
        <div className="puts">
          <input
              placeholder={"Write a comment..."}
              className="postInput"
              value={comment}
              onChange={handleChange}
              
            />
        </div>
        <button  type="submit" className={!comment ? 'icos faz' : 'icos'}>POST</button>
       
        <div>

        {loadingCommentCreate && <LoadingBox></LoadingBox>}
        {errorCommentCreate && (
          <MessageBox variant="danger">
            {errorCommentCreate}
          </MessageBox>
        )}

        </div>
      </form>
          
      </div>
      {editmodal && (
        <div className="editmodal">
          <div className="overlay">
          <div className="modal-content">
            <h1>Edit Post</h1>
          {/* <p className="postText">{post?.desc}</p> */}
          <input className="conm" type="text" placeholder='Add Caption...' defaultValue={post?.desc} ref={desc} />
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel odit expedita non temporibus inventore, esse laboriosam atque reprehenderit molestias quas fuga voluptatibus rerum provident maiores beatae labore eaque itaque est architecto praesentium quia nihil. Ratione eum minus placeat eos ullam, ipsum sunt molestiae, quo expedita nemo fugiat, soluta accusamus consequatur.    
            </p> */}

          {edit ?
          <div className="">
            <img className="pops" src={URL.createObjectURL(edit)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setEdit(null)} />
          </div>
          :
          <img className="pops" src={backend_url+post.img} alt="" />

        }
      

          <label htmlFor="edit" className="modal_editl">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="pops">Edit Image</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="edit"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setEdit(e.target.files[0])}
              />
            </label>

            <button onClick={toggleModal} className="close-modal btn btn-success ">
              Close
            </button>
            {/* <Cancel className="close-modal" onClick={toggleModal} /> */}
            <button className="btn btn-success " onClick={editPost}>Edit</button>
            {loading && <LoadingBox></LoadingBox>}


          </div>
        </div>
        </div>

      )}
      
  </div>
  );
}
