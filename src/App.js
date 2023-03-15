import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetail from "./Pages/BlogDetail";
import Blogs from "./Pages/Blogs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";
import Users from "./Pages/Users";
import MainLayout from "./components/MainLayout";
import { ProtectedLoginRoute, ProtectedAdminRoute, ProtectedLogoutRoute, ProtectedUserRoute } from "./util/ProtectedRoutes";
import About from "./Pages/About";
import UserDetail from "./Pages/UserDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Blogs  /> },
      { path: "myblogs", element: <Blogs  /> },
      { path: ":blogId", element: <ProtectedLoginRoute><BlogDetail /></ProtectedLoginRoute> },
      { path: "users", element: <ProtectedAdminRoute><Users /></ProtectedAdminRoute> },
      { path: "users/:userId", element: <ProtectedUserRoute><UserDetail /></ProtectedUserRoute> },
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
