import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import BlogDetail from "./Pages/BlogDetail";
import Blogs from "./Pages/Blogs";
// import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";
import Users from "./Pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Users /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:blogId", element: <BlogDetail /> },
    ],
  },
  { path: "signup", element: <SignUp /> },
  { path: "signin", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
