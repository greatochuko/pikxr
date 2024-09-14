import styles from "../styles/MainNav.module.css";

export default function MainNav() {
  return (
    <>
      <nav className={styles.mainNav}>
        <ul>
          <div className={styles.logo}>Pikxr</div>

          <form>
            <input type="text" placeholder="Search" />
          </form>
          <button className={styles.createPost}>+ Create new Post</button>
        </ul>
      </nav>
    </>
  );
}
