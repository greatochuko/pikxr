import { useDispatch } from "react-redux";
import { fetchfollowUser } from "../services/userServices";
import styles from "../styles/Suggestion.module.css";
import { loginUser } from "../slice/userSlice";

export default function Suggegstion({ user, setSuggestions }) {
  const dispatch = useDispatch();
  async function toggleFollow(e) {
    e.preventDefault();
    const data = await fetchfollowUser(user._id);
    if (data.error) return;
    setSuggestions((curr) => curr.filter((u) => u._id !== user._id));
    dispatch(loginUser(data));
  }

  return (
    <li className={styles.suggestion}>
      <img src={user.imageUrl} alt="" />
      <div>
        <h4>{user.fullname}</h4>
        <p>@{user.username}</p>
      </div>
      <button onClick={toggleFollow}>Follow</button>
    </li>
  );
}
