import { useSelector } from "react-redux";
import styles from "../styles/CommentForm.module.css";
import propTypes from "prop-types";
import { useState } from "react";
import { postComment } from "../services/commentServices";
import LoadingIndicator from "./LoadingIndicator";
import { fetchPost } from "../services/postServices";

export default function CommentForm({
  className,
  postId,
  setCurrentPost,
  creatorId,
}) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePostComment(e) {
    e.preventDefault();
    if (!comment) return;
    setLoading(true);
    const resData = await postComment(comment, creatorId, postId);
    if (resData.error) return setLoading(false);
    const data = await fetchPost(postId);
    if (data.error) return setLoading(false);
    setCurrentPost(data);
    setComment("");
    setLoading(false);
  }
  return (
    <form
      className={styles.commentForm + " " + className}
      onSubmit={handlePostComment}
    >
      <img src={user.imageUrl} alt="" />
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
      />
      <button type="submit">{loading ? <LoadingIndicator /> : "Send"}</button>
    </form>
  );
}

CommentForm.propTypes = {
  className: propTypes.string,
  postId: propTypes.string,
  setCurrentPost: propTypes.func,
  creatorId: propTypes.string,
};
