import { useEffect, useState } from "react";
import styles from "../styles/Suggestions.module.css";
import { fetchUsers } from "../services/userServices";
import { openModal } from "../slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Suggegstion from "./Suggegstion";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSuggestions() {
      const data = await fetchUsers();
      if (data.error) return;

      setSuggestions(
        data
          .filter(
            (suggestion) =>
              suggestion._id !== user._id &&
              !user.following.includes(suggestion._id)
          )
          .slice(0, 4)
      );
    }
    getSuggestions();
  }, [user._id, user.following]);

  return (
    <div className={styles.suggestions}>
      <h3>People to follow</h3>
      <ul>
        {suggestions.map((user) => (
          <Suggegstion
            key={user._id}
            user={user}
            setSuggestions={setSuggestions}
          />
        ))}
      </ul>
      <button onClick={() => dispatch(openModal({ type: "search" }))}>
        Show More
      </button>
    </div>
  );
}
