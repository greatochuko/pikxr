import { useEffect, useState } from "react";
import Creator from "../components/Creator";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import styles from "../styles/PostDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchPost,
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../services/postServices";
import PostDetailWireFrame from "./PostDetailWireFrame";

export default function PostDetail() {
  const { user } = useSelector((state) => state.user);
  const { open } = useSelector((state) => state.modal);

  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLiked = post?.likes?.includes(user._id);
  const isSaved = post?.saves?.includes(user._id);

  const comments = post
    ? post.comments
        .map((a) => a)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      setLoading(true);
      const data = await fetchPost(postId);
      if (data.error) return setError(true);
      setPost(data);
      setLoading(false);
    }
    if (open) return;
    getPost();
  }, [postId, open, navigate]);

  async function toggleLike() {
    let data;
    if (!isLiked) {
      data = await likePost(post._id, post.creator._id);
      if (data.error) {
        return;
      }
    } else {
      data = await unLikePost(post._id, post.creator._id);
      if (data.error) {
        return;
      }
    }
    setPost(data);
  }

  async function toggleSave() {
    let data;
    if (!isSaved) {
      data = await savePost(post._id);
      if (data.error) {
        return;
      }
    } else {
      data = await unSavePost(post._id);
      if (data.error) {
        return;
      }
    }
    setPost(data);
  }

  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2>Post</h2>
      </div>
      {error ? (
        <h2
          style={{
            flex: 2,
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          Post not found😟{" "}
        </h2>
      ) : loading ? (
        <PostDetailWireFrame />
      ) : (
        <>
          <div className={styles.post}>
            <Creator post={post} setCurrentPost={setPost} />
            <p className={styles.caption}>{post.caption}</p>
            <div className={styles.images}>
              <img src={post.imageUrl} alt="" />
            </div>
            <div className={styles.actions}>
              <button
                className={isLiked ? styles.active : ""}
                onClick={toggleLike}
              >
                <i className="fa-solid fa-heart"></i> Like
              </button>
              <button>
                <i className="fa-solid fa-retweet"></i> Repost
              </button>
              <button>
                <i className="fa-solid fa-comment-dots"></i> Comment
              </button>
              <button
                className={isSaved ? styles.active : ""}
                onClick={toggleSave}
              >
                <i className="fa-solid fa-bookmark"></i>
              </button>
            </div>
          </div>
          <CommentForm
            postId={post._id}
            creatorId={post.creator._id}
            setCurrentPost={setPost}
          />
          <div className={styles.comments}>
            <ul>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  setCurrentPost={setPost}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
