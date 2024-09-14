import styles from "../styles/Comment.module.css";
import PropType from "prop-types";
import OptionsButton from "./OptionsButton";
import { useDispatch, useSelector } from "react-redux";
import { getDuration } from "../utils/getDuration";
import { openModal } from "../slice/modalSlice";

export default function Comment({ comment, setCurrentPost }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function openDeleteCommentModal() {
    dispatch(openModal({ type: "deleteComment", commentId: comment._id }));
  }

  return (
    <li className={styles.comment}>
      <img src={comment.user.imageUrl} alt="" />
      <div className={styles.details}>
        <h4>{comment.user.fullname}</h4>
        <p className={styles.duration}>{getDuration(comment.createdAt)}</p>
        <p>{comment.comment}</p>
      </div>
      {user._id === comment.user._id ? (
        <OptionsButton
          type={"comment"}
          openDeleteModal={openDeleteCommentModal}
          setCurrentPost={setCurrentPost}
        />
      ) : null}
    </li>
  );
}

Comment.propTypes = {
  comment: PropType.object,
  setType: PropType.func,
};
