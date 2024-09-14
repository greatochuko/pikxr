import styles from "../styles/PostWireFrame.module.css";

export default function PostWireFrame() {
  return (
    <div className={styles.post}>
      <div className={styles.creator}>
        <div className={styles.creatorImage}></div>
        <div className={styles.creatorDetails}>
          <div className={styles.fullname}></div>
          <div className={styles.username}></div>
        </div>
        <div className={styles.options}>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className={styles.images}></div>
    </div>
  );
}
