import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BlogDetail.css"

const BlogDetail = () => {
  const blogs = useSelector((state) => state.blog?.blogs);

  const params = useParams();

  let currentBlog = blogs.find((blog) => {
    return blog.id === parseInt(params.blogId);
  });

  return (
    <div className="main-container">
      <section>
        <div className="blog-detail">
          <div className="blog">
            <img className="picture" src={currentBlog.image} alt={currentBlog.title} />
            <div className="main-content">
              <h2 className="title" >Title : {currentBlog.title}</h2>
              <h2 className="author">Author : {currentBlog.author}</h2>
              <h3 className="category">Category : {currentBlog.category}</h3>
            </div>
          </div>
          <p className="description">{currentBlog.description}</p>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
