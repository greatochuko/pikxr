import styles from "../styles/Story.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../slice/modalSlice";

export default function Story({ story, type }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return type === "watch" ? (
    <div
      className={styles.story + " " + styles.watch}
      onClick={() => dispatch(openModal({ type: "viewStory", story }))}
    >
      <i className="fa-solid fa-play"></i>
      <h4 className={styles.username}>Watch all</h4>
    </div>
  ) : story ? (
    <div
      className={`${styles.story}`}
      onClick={() => dispatch(openModal({ type: "viewStory", story }))}
    >
      <img src={story.imageUrl} alt="Story image" />
      <h4 className={styles.username}>@{story.creator.username}</h4>
    </div>
  ) : (
    <div
      className={styles.story + " " + styles.addStory}
      onClick={() => dispatch(openModal({ type: "createStory" }))}
    >
      <img src={user.imageUrl} alt={"user image"} />
      <button>
        <i className="fa-solid fa-circle-plus"></i>
      </button>
      <h4 className={styles.username}>Your Story</h4>
    </div>
  );
}

Story.propTypes = {
  story: PropTypes.object,
  type: PropTypes.string,
  stories: PropTypes.array,
  setStories: PropTypes.func,
};
