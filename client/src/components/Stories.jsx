import { useEffect, useState } from "react";
import styles from "../styles/Stories.module.css";
import Story from "./Story";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../slice/storySlice";
import { fetchStories } from "../services/storyServices";
import StoryWireFrame from "./StoryWireFrame";
import { logoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Stories() {
  const { stories } = useSelector((state) => state.story);
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const sortedStories = stories
    ?.map((a) => a)
    .sort((a, b) => {
      return new Date(a.createdAt).getTime - new Date(b.createdAt).getTime;
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshStories() {
      setIsLoading(true);
      const data = await fetchStories();
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      dispatch(setStories(data));
      setIsLoading(false);
    }
    refreshStories();
  }, [dispatch, navigate]);

  let userHasStory = false;
  stories?.forEach((story) => {
    if (story.creator._id === user._id) return (userHasStory = true);
  });

  return (
    <div className={styles.stories}>
      <div className={styles.header}>
        <h3>Stories</h3>
      </div>
      <div className={styles.storiesList}>
        {isLoading ? (
          <StoryWireFrame />
        ) : (
          <>
            {!userHasStory ? <Story /> : null}
            {sortedStories?.map((story) => (
              <Story story={story} key={story._id} />
            ))}
            {sortedStories?.length ? <Story type={"watch"} /> : null}
          </>
        )}
      </div>
    </div>
  );
}
