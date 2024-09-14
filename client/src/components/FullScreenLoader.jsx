import styles from "../styles/FullScreenLoader.module.css";

export default function FullScreenLoader() {
  return (
    <div className={styles.fullScreenLoader}>
      <img className={styles.logo} src="/favicon.ico" alt="" />
      <div className={styles.loader}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}
