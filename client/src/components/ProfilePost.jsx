import propTypes from "prop-types";
import styles from "../styles/ProfilePost.module.css";
import { openModal } from "../slice/modalSlice";
import { useDispatch } from "react-redux";

export default function ProfilePost({ post }) {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.post}
      key={post._id}
      onClick={() => dispatch(openModal({ type: "viewPost", post }))}
    >
      <img src={post.imageUrl} alt="" />
      <div className={styles.overlay}>
        <div className={styles.postStats}>
          <p>
            <i className="fa-solid fa-heart"></i>
            {post.likes.length}
          </p>
          <p>
            <i className="fa-solid fa-comment"></i>
            {post.comments.length}
          </p>
        </div>
      </div>
    </div>
  );
}

ProfilePost.propTypes = {
  post: propTypes.object,
};
