import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Pages/About";
// import BlogDetail from "./Pages/BlogDetail";
import Blogs from "./Pages/Blogs";
// import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SingUp";
import Users from "./Pages/Users";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Blogs /> },
      { path: "users", element: <Users /> },
      { path: "about", element: <About /> },
      // { path: "blogs/:blogId", element: <BlogDetail /> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <Login /> },
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
  // return <MainLayout />
}

export default App;
