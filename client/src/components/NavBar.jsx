import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/NavBar.module.css";
import { openModal } from "../slice/modalSlice";

export default function NavBar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <Link to={"/"} className={styles.logo}>
        <img src="/logo.png" alt="pikxr logo" />
      </Link>
      <ul>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link to={"/"}>
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>
        <li className={pathname === "/explore" ? styles.active : ""}>
          <Link to={"/explore"}>
            <i className="fa-solid fa-compass"></i>
          </Link>
        </li>
        <li>
          <a onClick={() => dispatch(openModal({ type: "search" }))}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
        </li>
        <li
          className={styles.createPost}
          onClick={() => dispatch(openModal({ type: "createPost" }))}
        >
          <a>
            <i className="fa-solid fa-circle-plus"></i>
          </a>
        </li>
        <li className={pathname === "/notifications" ? styles.active : ""}>
          <Link to="/notifications">
            <i className="fa-solid fa-bell"></i>
          </Link>
        </li>
      </ul>
      <div className={styles.profile}>
        <li
          className={styles.logout}
          onClick={() => dispatch(openModal({ type: "logout" }))}
        >
          <a>
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </li>
        <Link to={"/profile/" + user.username}>
          <img src={user.imageUrl} alt="" />
        </Link>
      </div>
    </nav>
  );
}
