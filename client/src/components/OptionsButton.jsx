import styles from "../styles/OptionsButton.module.css";
import propTypes from "prop-types";

export default function OptionsButton({
  openEditPostModal,
  openDeleteModal,
  type,
}) {
  return (
    <>
      <div className={styles.options} onClick={(e) => e.stopPropagation()}>
        {!type ? (
          <button className={styles.optionsButton} onClick={openEditPostModal}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        ) : null}
        <button
          className={styles.optionsButton + " " + styles.delete}
          onClick={openDeleteModal}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </>
  );
}

OptionsButton.propTypes = {
  top: propTypes.number,
  right: propTypes.number,
  size: propTypes.number,
  openEditPostModal: propTypes.func,
  openDeleteModal: propTypes.func,
  type: propTypes.string,
};
