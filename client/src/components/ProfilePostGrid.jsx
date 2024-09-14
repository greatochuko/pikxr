import styles from "../styles/ProfilePostGrid.module.css";
import ProfilePost from "./ProfilePost";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postServices";
import { logoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ProfilePostGrid({ type, user }) {
  const [posts, setPosts] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function refreshPosts() {
      const data = await fetchPosts();
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      if (data.error) return;
      setPosts(data);
    }
    refreshPosts();
  }, [dispatch, navigate]);

  let filteredPosts = posts;

  if (type === "posts") {
    filteredPosts = posts?.filter((p) => p.creator._id === user._id);
  } else if (type === "liked") {
    filteredPosts = posts?.filter((p) => user.likedPosts.includes(p._id));
  } else if (type === "saved") {
    filteredPosts = posts?.filter((p) => user.savedPosts.includes(p._id));
  }

  return (
    <div className={styles.postGrid}>
      {filteredPosts?.length ? (
        filteredPosts?.map((post) => <ProfilePost post={post} key={post._id} />)
      ) : (
        <p className={styles.noPosts}>
          You have no {type !== "posts" && type} posts
        </p>
      )}
    </div>
  );
}

ProfilePostGrid.propTypes = {
  type: propTypes.string,
  user: propTypes.object,
};
