import { Link } from "react-router-dom";
import styles from "../styles/SideBar.module.css";
import { useSelector } from "react-redux";
import Suggestions from "./Suggestions";

export default function SideBar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className={styles.sideBar}>
      <div className={styles.userInfo}>
        <div className={styles.userImage}>
          <img className={styles.coverPhoto} src={user.coverPhotoUrl} alt="" />
          <img className={styles.profilePhoto} src={user.imageUrl} alt="" />
        </div>
        <h3>{user.fullname}</h3>
        <p className={styles.username}>@{user.username}</p>
        <p className={styles.about}>{user.about}</p>
        <div className={styles.userStats}>
          <div>
            <span>{user.following.length}</span>Following
          </div>
          <div>
            <span>{user.followers.length}</span>Followers
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>My Profile</Link>
      </div>
      <Suggestions />
    </div>
  );
}
