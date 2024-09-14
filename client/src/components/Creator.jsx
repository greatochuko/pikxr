import styles from "../styles/Creator.module.css";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import OptionsButton from "./OptionsButton";
import { getDuration } from "../utils/getDuration";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../slice/modalSlice";

export default function Creator({ post, story, className }) {
  const data = post || story;
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user } = useSelector((state) => state.user);

  function openEditPostModal() {
    dispatch(openModal({ type: "editPost", post }));
  }

  function openDeleteModal() {
    if (story) dispatch(openModal({ type: "deleteStory", story }));
    else dispatch(openModal({ type: "deletePost", post }));
  }

  return (
    <>
      <div className={styles.creator + " " + className}>
        <Link
          to={"/profile/" + data.creator.username}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={data.creator.imageUrl} alt="" />
          <div>
            <h4>
              {data.creator.fullname} <span>@{data.creator.username}</span>
            </h4>
            <p>{getDuration(data.createdAt)}</p>
          </div>
        </Link>
        {pathname.includes("post") && user._id === data.creator._id ? (
          <OptionsButton
            openEditPostModal={openEditPostModal}
            openDeleteModal={openDeleteModal}
          />
        ) : null}
      </div>
    </>
  );
}

Creator.propTypes = {
  post: PropTypes.object,
  story: PropTypes.object,
  className: PropTypes.string,
};
