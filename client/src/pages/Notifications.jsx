import { useEffect, useState } from "react";
import styles from "../styles/Notifications.module.css";
import {
  fetchNotifications,
  markNotificationsAsRead,
} from "../services/notificationServices";
import Notification from "../components/Notification";
import NotificationWireFrame from "../components/NotificationWireFrame";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../slice/userSlice";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshNotifications() {
      setIsLoading(true);
      const data = await fetchNotifications();
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      setNotifications(data);
      setIsLoading(false);
    }
    refreshNotifications();
  }, [dispatch, navigate]);

  if (notifications && notifications.error === "jwt expired") {
    dispatch(logoutUser());
    navigate("/login");
  }

  const unReadNotifications = notifications.filter(
    (notif) => notif.isRead === false
  ).length;

  async function markAsRead() {
    if (!unReadNotifications) return;
    const data = await markNotificationsAsRead();
    setNotifications(data);
  }

  if (!notifications.error)
    return (
      <div className={styles.notifications}>
        <h2 className={styles.title}>
          Notifications({unReadNotifications})
          <button onClick={markAsRead}>Mark all as read</button>
        </h2>
        <div className={styles.notificationList}>
          {isLoading ? (
            <>
              <NotificationWireFrame />
              <NotificationWireFrame />
              <NotificationWireFrame />
            </>
          ) : (
            notifications.map((notif) => (
              <Notification key={notif._id} notif={notif} />
            ))
          )}
        </div>
      </div>
    );
}
