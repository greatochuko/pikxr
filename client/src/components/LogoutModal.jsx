import { fetchDeletePost } from "../services/postServices";
import { logoutUser } from "../slice/userSlice";
import styles from "../styles/LogoutModal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { closeModal } from "../slice/modalSlice";

export default function LogoutModal({ type, postId, storyId, setPosts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function closeModalContainer() {
    dispatch(closeModal());
  }

  function logout() {
    navigate("/login");
    dispatch(logoutUser());
  }

  async function deletePost() {
    await fetchDeletePost(postId);
    setPosts((curr) => curr.filter((p) => p._id !== postId));
  }

  async function deleteStory() {
    await fetchDeletePost(storyId);
    // setPosts((curr) => curr.filter((p) => p._id !== postId));
  }

  if (type === "deletePost") {
    return (
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Delete Post?</h3>
          <p>Are you sure you want to delete this post?</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={closeModalContainer}>Cancel</button>
          <button onClick={deletePost} className={styles.logout}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  if (type === "deleteStory") {
    return (
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Delete Story?</h3>
          <p>Are you sure you want to delete this story?</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={closeModalContainer}>Cancel</button>
          <button onClick={deleteStory} className={styles.logout}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <h3>Logout?</h3>
        <p>Are you sure you want to logout?</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={closeModalContainer}>Cancel</button>
        <button onClick={logout} className={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

LogoutModal.propTypes = {
  type: propTypes.string,
  closeModalContainer: propTypes.func,
  postId: propTypes.string,
  storyId: propTypes.string,
  setPosts: propTypes.func,
};
