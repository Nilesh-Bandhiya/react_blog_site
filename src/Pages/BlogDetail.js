import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const blogs = useSelector((state) => state.blog?.blogs);

  const params = useParams();

  let currentBlog = blogs.find((blog) => {
    return blog.id === parseInt(params.blogId);
  });

  return (
    <div
      className="ag-theme-alpine"
      style={{
        backgroundColor: "aqua",
        margin: " 0 auto",
        boxSizing: "border-box",
        height: "80vh",
        width: "85vw",
      }}
    >
      <h2>{params.blogId}</h2>
      <img src={currentBlog?.image} alt={currentBlog?.title} />
    </div>
  );
};

export default BlogDetail;
