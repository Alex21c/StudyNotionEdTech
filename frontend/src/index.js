import ContextProviderStudyNotionWebApp from "./Context";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import NotFound from "./Pages/NotFound/NotFound";
import ModifyRole from "./Pages/ModifyRole/ModifyRole";
import Login from "./Pages/Login/Login";
import RegisterNewUser from "./Pages/RegisterNewUser/RegisterNewUser";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SetAuthrizationTokenAndRedirect from "./Pages/SetAuthrizationTokenAndRedirect/SetAuthrizationTokenAndRedirect";
import "./Assests/fontAwesomeProIcons/fontAwesomeIcons.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: "/SetAuthrizationTokenAndRedirect",
    element: <SetAuthrizationTokenAndRedirect />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register-new-user",
    element: <RegisterNewUser />,
    errorElement: <NotFound />,
  },
  {
    path: "/modify-role",
    element: <ModifyRole />,
    errorElement: <NotFound />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProviderStudyNotionWebApp>
    <RouterProvider router={router} />
  </ContextProviderStudyNotionWebApp>
);
