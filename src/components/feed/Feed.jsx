import { useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from "../../actions/postActions";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username, update }) {
  // const [posts, setPosts] = useState([]);
  // const { user } = useContext(AuthContext);

  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;
  
  const Posts = useSelector((state) => state.fetchPosts);
  const { posts, loading } = Posts;

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(username);
    dispatch(fetchPosts({username}));
    
  }, [username, dispatch, update]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {((!username || username === user.username) && (user.isAdmin || user.isSeller)) && <Share />}
        {!loading && 
          posts.map((p) => (
            <Post key={p._id} post={p} />
          ))
        }
        
      </div>
      
    </div>
  );
}
