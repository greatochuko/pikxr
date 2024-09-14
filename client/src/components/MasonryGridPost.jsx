import styles from "../styles/MasonryGridPost.module.css";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openModal } from "../slice/modalSlice";

export default function MasonryGridPost({ post }) {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.post}
      onClick={() => dispatch(openModal({ type: "viewPost", post }))}
    >
      <img src={post.imageUrl} alt="" />
      <div className={styles.overlay}>
        <span>
          <i className="fa-solid fa-heart"></i>
          {post.likes.length}
        </span>

        <span>
          <i className="fa-solid fa-comment"></i>
          {post.comments.length}
        </span>
      </div>
    </div>
  );
}

MasonryGridPost.propTypes = {
  post: propTypes.object,
};
