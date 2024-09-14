import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/CreatePostModal.module.css";
import { setPosts } from "../slice/postSlice";
import { useRef, useState } from "react";
import { createPost, fetchPosts } from "../services/postServices";
import { resizeImage } from "../utils/imageResize";
import LoadingIndicator from "./LoadingIndicator";
import { logoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../slice/modalSlice";

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageInputRef = useRef();
  const [caption, setCaption] = useState();
  const [imgPreviewSrc, setImgPreviewSrc] = useState();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  function closeModalContainer() {
    dispatch(closeModal());
  }

  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      resizeImage(imageInputRef, (file, src) => {
        setImage(file);
        setImgPreviewSrc(src);
      });
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    formData.append("creator", user._id);

    try {
      await createPost(formData);
      const data = await fetchPosts();
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      dispatch(setPosts(data));
      closeModalContainer();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  const cannotSubmit = !caption || !image;

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.header}>Create new post</h2>
      <button className={styles.close} onClick={closeModalContainer}>
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <form onSubmit={handleCreatePost}>
        <div
          className={`${styles.imgPreview} ${
            imgPreviewSrc ? styles.imageLoaded : ""
          }`}
        >
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            accept=".png, .jpg, .jpeg"
            ref={imageInputRef}
          />
          <label htmlFor="image">
            <p>
              <i className="fa-regular fa-images"></i>
              {imgPreviewSrc ? "Change img" : "Click to upload photo"}
            </p>
          </label>
          {imgPreviewSrc && <img src={imgPreviewSrc} alt="" />}
        </div>
        <div className={styles.user}>
          <img src={user.imageUrl} alt="" />
          <p>@{user.username}</p>
        </div>
        <textarea
          name="caption"
          id="caption"
          cols="30"
          rows="10"
          placeholder="Write a caption"
          required
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <button type="submit" disabled={cannotSubmit}>
          {loading ? <LoadingIndicator /> : "Create"}
        </button>
      </form>
    </div>
  );
}
