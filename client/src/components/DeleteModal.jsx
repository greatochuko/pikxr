import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeletePost,
  fetchDeleteStory,
  fetchPosts,
} from "../services/postServices";
import { fetchStories } from "../services/storyServices";
import styles from "../styles/LogoutModal.module.css";
import { setStories } from "../slice/storySlice";
import { setPosts } from "../slice/postSlice";
import { fetchDeleteComment } from "../services/commentServices";
import { logoutUser } from "../slice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { closeModal } from "../slice/modalSlice";

export default function DeleteModal() {
  const { type, post, commentId, story } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function closeModalContainer() {
    dispatch(closeModal());
  }

  async function deletePost() {
    const data = await fetchDeletePost(post._id);
    if (data.error) return;
    const postData = await fetchPosts();
    if (postData.error) return;
    dispatch(setPosts(postData));
    dispatch(closeModal());
    if (pathname.includes("/post/")) navigate(-1);
  }

  async function deleteStory() {
    await fetchDeleteStory(story._id);
    const data = await fetchStories();
    if (data.error === "jwt expired") {
      dispatch(logoutUser());
      navigate("/login");
    }
    dispatch(setStories(data));
  }

  async function deleteComment() {
    const data = await fetchDeleteComment(commentId);
    if (data.error) return;
    closeModalContainer();
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

  if (type.includes("deleteComment")) {
    return (
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Delete Comment?</h3>
          <p>Are you sure you want to delete this comment?</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={closeModalContainer}>Cancel</button>
          <button onClick={deleteComment} className={styles.logout}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
