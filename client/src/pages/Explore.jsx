import { useEffect, useRef, useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import styles from "../styles/Explore.module.css";
import { generateMasonryArray } from "../utils/createMansoryArray";
import { fetchPosts } from "../services/postServices";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const exploreRef = useRef(null);
  const [columns, setColumns] = useState(null);
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshPosts() {
      const data = await fetchPosts();
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      setPosts(data);
    }
    refreshPosts();
  }, [navigate, dispatch]);

  const explore = exploreRef.current;

  const MIN_WIDTH = 250;
  let data;
  if (columns) {
    data = generateMasonryArray(columns, posts);
  }

  useEffect(() => {
    const handleResize = () => {
      if (columns === Math.ceil(exploreRef.current?.clientWidth / MIN_WIDTH))
        return;
      setColumns(Math.ceil(exploreRef.current?.clientWidth / MIN_WIDTH));
    };
    if (!columns && posts) {
      setColumns(Math.ceil(exploreRef.current?.clientWidth / MIN_WIDTH));
    }

    // Add the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [explore, posts, columns]);

  return (
    <main className={styles.explore} ref={exploreRef}>
      {data && <MasonryGrid data={data} />}
    </main>
  );
}
