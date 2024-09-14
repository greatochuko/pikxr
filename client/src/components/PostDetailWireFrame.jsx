import styles from "../styles/PostDetailWireFrame.module.css";

export default function PostDetailWireFrame() {
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
      <div className={styles.caption}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.images}></div>
    </div>
  );
}
