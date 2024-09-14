import styles from "../styles/ModalContainer.module.css";
import CreatePostModal from "./CreatePostModal";
import propTypes from "prop-types";
import PostViewModal from "./PostViewModal";
import LogoutModal from "./LogoutModal";
import CreateStoryModal from "./CreateStoryModal";
import StoryViewModal from "./StoryViewModal";
import SearchModal from "./SearchModal";
import FollowersModal from "./FollowersModal";
import DeleteModal from "./DeleteModal";
import EditPostModal from "./EditPostModal";
import { closeModal } from "../slice/modalSlice";
import { useDispatch } from "react-redux";

const modalComponent = {
  createPost: <CreatePostModal />,
  editPost: <EditPostModal />,
  viewPost: <PostViewModal />,
  logout: <LogoutModal />,
  deletePost: <DeleteModal />,
  deleteStory: <DeleteModal />,
  deleteComment: <DeleteModal />,
  createStory: <CreateStoryModal />,
  viewStory: <StoryViewModal />,
  search: <SearchModal />,
  followers: <FollowersModal />,
  following: <FollowersModal />,
};

export default function ModalContainer({ type }) {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.modalContainer}
      onClick={() => dispatch(closeModal())}
    >
      {modalComponent[type]}
    </div>
  );
}

ModalContainer.propTypes = {
  type: propTypes.string,
};
