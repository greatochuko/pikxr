import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../slice/userSlice";
import { Suspense, useEffect, useState } from "react";
import FullScreenLoader from "./FullScreenLoader";
import { fetchUser } from "../services/userServices";

export default function Authenticate({ children }) {
  const { user } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function refreshUser() {
      const token = localStorage.getItem("token");
      const user = token ? await fetchUser() : null;
      dispatch(loginUser(user));
      setRefresh(true);
    }
    refreshUser();
  }, [dispatch]);

  if (!refresh) return <FullScreenLoader />;

  if (!user || user.error) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace={true} />;
  } else {
    return <Suspense fallback={null}>{children}</Suspense>;
  }
}

Authenticate.propTypes = {
  children: PropTypes.element,
};
