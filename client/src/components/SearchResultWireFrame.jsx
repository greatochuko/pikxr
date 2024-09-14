import styles from "../styles/SearchResultWireFrame.module.css";

export default function SearchResultWireFrame() {
  return (
    <div className={styles.result}>
      <div className={styles.image}></div>
      <div className={styles.details}>
        <div className={styles.fullname}></div>
        <div className={styles.username}></div>
      </div>
    </div>
  );
}
