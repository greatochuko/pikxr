import styles from "../styles/MasonryGridColumn.module.css";
import MasonryGridPost from "./MasonryGridPost";
import propTypes from "prop-types";

export default function MasonryGridColumn({ posts }) {
  return (
    <div className={styles.grid}>
      {posts.map((post, i) => (
        <MasonryGridPost key={i} post={post} />
      ))}
    </div>
  );
}

MasonryGridColumn.propTypes = {
  posts: propTypes.array,
};
