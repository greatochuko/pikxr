import styles from "../styles/MasonryGrid.module.css";
import MasonryGridColumn from "./MasonryGridColumn";
import propTypes from "prop-types";

export default function MasonryGrid({ data }) {
  return (
    <div className={styles.masonryGrid}>
      {data.map((posts, i) => (
        <MasonryGridColumn key={i} posts={posts} />
      ))}
    </div>
  );
}

MasonryGrid.propTypes = {
  data: propTypes.array,
};
