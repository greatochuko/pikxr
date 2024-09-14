import styles from "../styles/FollowerWireframe.module.css";

export default function FollowerWireframe() {
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
