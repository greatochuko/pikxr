import styles from "../styles/LoadingIndicator.module.css";

export default function LoadingIndicator() {
  return (
    <span className={styles.loadingIndicator}>
      <i className="fa-solid fa-spinner"></i>
    </span>
  );
}
