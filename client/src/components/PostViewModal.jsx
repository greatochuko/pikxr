import styles from "../styles/PostViewModal.module.css";
import CommentForm from "./CommentForm";
import Comment from "./Comment.jsx";
import Creator from "./Creator";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPost } from "../services/postServices.js";

export default function PostViewModal({ updateMasonryGridPost, setType }) {
  const { post: reduxPost } = useSelector((state) => state.modal);
  const [post, setPost] = useState(reduxPost);

  useEffect(() => {
    async function getPost() {
      const data = await fetchPost(post._id);
      if (data.error) return;
      setPost(data);
    }
    getPost();
  }, [post._id]);

  let sortedComments = [];
  if (post.comments.length && post.comments[0]._id) {
    sortedComments = [...post.comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <div className={styles.postViewModal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.imgContainer}>
        <img src={post.imageUrl} alt="" />
        <p className={styles.caption}>{post.caption}</p>
      </div>
      <div className={styles.details}>
        <Creator post={post} className={styles.creator} setType={setType} />

        <div className={styles.comments}>
          <ul>
            {sortedComments.map((comment) => (
              <Comment key={comment._id} comment={comment} setType={setType} />
            ))}
          </ul>
        </div>
        <CommentForm
          className={styles.commentForm}
          postId={post._id}
          setCurrentPost={updateMasonryGridPost || setPost}
          creatorId={post.creator._id}
        />
      </div>
    </div>
  );
}

PostViewModal.propTypes = {
  post: propTypes.object,
  updateMasonryGridPost: propTypes.func,
  setType: propTypes.func,
  setCurrentPost: propTypes.func,
};
