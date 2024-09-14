import { Link, useParams } from "react-router-dom";
import styles from "../styles/Follower.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnFollowUser,
  fetchUserProfile,
  fetchfollowUser,
} from "../services/userServices";
import propTypes from "prop-types";
import { useState } from "react";
import { loginUser } from "../slice/userSlice";

export default function Follower({ follower, type }) {
  const { user } = useSelector((state) => state.user);
  const { username } = useParams();

  const dispatch = useDispatch();

  let following = true;
  if (type === "followers") {
    following = user.following.includes(follower._id);
  }

  const [isFollowing, setIsFollowing] = useState(following);

  async function toggleFollow(e) {
    e.preventDefault();
    let data;
    if (isFollowing) data = await fetchUnFollowUser(follower._id);
    else if (!isFollowing) data = await fetchfollowUser(follower._id);
    if (data.error) return;
    setIsFollowing((curr) => !curr);
    const userData = await fetchUserProfile(user.username);
    if (userData.error) return;
    dispatch(loginUser(userData));
  }

  return (
    <li className={styles.follower} key={follower._id}>
      <Link to={"/profile/" + follower.username}>
        <img src={follower.imageUrl} alt="" />
        <div className={styles.info}>
          <p>{follower.fullname}</p>
          <p>@{follower.username}</p>
        </div>
        {user.username === username ? (
          <button onClick={toggleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        ) : null}
      </Link>
    </li>
  );
}

Follower.propTypes = {
  follower: propTypes.object,
  type: propTypes.string,
  closeModalContainer: propTypes.func,
};
