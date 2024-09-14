import styles from "../styles/RightSidebar.module.css";
import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postServices";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function refreshPosts() {
      setLoading(true);
      const data = await fetchPosts();
      if (data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setPosts(
        [...data]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 4)
      );
      setLoading(false);
    }
    refreshPosts();
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.trendingFeeds}>
        <h3>Trending Feeds</h3>
        {error ? (
          <p className={styles.trendingFeedsError}>Something went wrong 😢</p>
        ) : (
          <ul>
            {loading ? (
              <>
                <li className={styles.wireframe}></li>
                <li className={styles.wireframe}></li>
                <li className={styles.wireframe}></li>
                <li className={styles.wireframe}></li>
              </>
            ) : (
              posts.map((post) => (
                <li key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <img src={post.imageUrl} alt="" />
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className={styles.trendingHashTags}>
        <h3>Trending Hash Tags</h3>
        <ul>
          <li>
            <Link to={"/"}>
              #react <span>2.7k Posts</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              #react <span>2.7k Posts</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              #react <span>2.7k Posts</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
