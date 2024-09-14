import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
// const Authenticate = React.lazy(() => import("./components/Authenticate"));
// const HomePage = React.lazy(() => import("./pages/HomePage"));
// const Login = React.lazy(() => import("./pages/Login"));
// const Signup = React.lazy(() => import("./pages/Signup"));
// const AppLayout = React.lazy(() => import("./pages/AppLayout"));
// const Explore = React.lazy(() => import("./pages/Explore"));
// const Notifications = React.lazy(() => import("./pages/Notifications"));
// const Settings = React.lazy(() => import("./pages/Settings"));
// const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
// const Profile = React.lazy(() => import("./pages/Profile"));
// const PostDetailPage = React.lazy(() => import("./pages/PostDetailPage"));
import Authenticate from "./components/Authenticate"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AppLayout from "./pages/AppLayout"
import Explore from "./pages/Explore"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./pages/Profile"
import PostDetailPage from "./pages/PostDetailPage"

const router = createHashRouter([
  {
    element: (
      <Authenticate>
        <AppLayout />
      </Authenticate>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/post/:postId",
        element: <PostDetailPage />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <h1>asljk</h1> */}
    </Provider>
  );
}

export default App;
