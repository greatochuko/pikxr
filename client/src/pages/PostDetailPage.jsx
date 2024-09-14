import styles from "../styles/PostDetailPage.module.css";
import RightSidebar from "../components/RightSidebar";
import SideBar from "../components/SideBar";
import PostDetail from "../components/PostDetail";

export default function PostDetailPage() {
  return (
    <div className={styles.postDetailPage}>
      <SideBar />
      <PostDetail />
      <RightSidebar />
    </div>
  );
}
