import { Link, useLocation } from "react-router-dom";

import styles from "../styles/MobileNavBar.module.css";
import { openModal } from "../slice/modalSlice";
import { useDispatch } from "react-redux";

export default function MobileNavBar() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  return (
    <nav className={styles.navbar}>
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
        <li>
          <Link
            to="/notifications"
            className={pathname === "/notifications" ? styles.active : ""}
          >
            <i className="fa-solid fa-bell"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
