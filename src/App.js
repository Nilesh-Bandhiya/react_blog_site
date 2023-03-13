import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetail from "./Pages/BlogDetail";
import Blogs from "./Pages/Blogs";
// import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";
import Users from "./Pages/Users";
import MainLayout from "./components/MainLayout";
import { ProtectedUserRoute, ProtectedAdminRoute, ProtectedLogoutRoute } from "./util/ProtectedRoutes";
import About from "./Pages/About";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Blogs  /> },
      { path: "myblogs", element: <Blogs  /> },
      { path: ":blogId", element: <ProtectedUserRoute><BlogDetail /></ProtectedUserRoute> },
      { path: "users", element: <ProtectedAdminRoute><Users /></ProtectedAdminRoute> },
      { path: "about", element: <About /> },
      { path: "signup", element: <ProtectedLogoutRoute><SignUp /></ProtectedLogoutRoute> },
      { path: "signin", element: <ProtectedLogoutRoute><Login /></ProtectedLogoutRoute> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
