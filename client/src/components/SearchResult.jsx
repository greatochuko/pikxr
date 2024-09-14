import { Link } from "react-router-dom";
import styles from "../styles/SearchResult.module.css";
import propTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnFollowUser,
  fetchUserProfile,
  fetchfollowUser,
} from "../services/userServices";
import { loginUser } from "../slice/userSlice";

export default function SearchResult({ result, closeModalContainer }) {
  const { user } = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(
    user.following.includes(result._id)
  );

  const dispatch = useDispatch();

  async function toggleFollow(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isFollowing) await fetchUnFollowUser(result._id);
    else if (!isFollowing) await fetchfollowUser(result._id);
    setIsFollowing((curr) => !curr);
    const userData = await fetchUserProfile(user.username);
    if (userData.error) return;
    dispatch(loginUser(userData));
  }

  return (
    <li className={styles.result} key={result._id}>
      <Link to={"/profile/" + result.username} onClick={closeModalContainer}>
        <img src={result.imageUrl} alt="" />
        <div className={styles.resultDetails}>
          <h3>{result.fullname}</h3>
          <p>
            @{result.username + " - "}
            <span>
              {result.followers.length}
              {result.followers.length > 1 ? " Followers" : " Follower"}
            </span>
          </p>
        </div>
        {user._id === result._id ? null : (
          <button onClick={toggleFollow}>
            {isFollowing ? "UnFollow" : "Follow"}
          </button>
        )}
      </Link>
    </li>
  );
}

SearchResult.propTypes = {
  result: propTypes.object,
  closeModalContainer: propTypes.func,
};
