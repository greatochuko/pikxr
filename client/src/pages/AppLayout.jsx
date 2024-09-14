import { Outlet } from "react-router-dom";
import styles from "../styles/AppLayout.module.css";
import { useSelector } from "react-redux";
import ModalContainer from "../components/ModalContainer";
import NavBar from "../components/NavBar";
import MobileNavBar from "../components/MobileNavBar";

export default function AppLayout() {
  const { open, type } = useSelector((state) => state.modal);
  return (
    <div className={styles.appLayout}>
      <NavBar />
      <Outlet />
      <MobileNavBar />
      {open ? <ModalContainer type={type} /> : null}
    </div>
  );
}
