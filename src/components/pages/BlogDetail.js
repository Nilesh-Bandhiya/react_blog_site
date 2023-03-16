import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css"
import { getBlogDetails } from "../../services/api/blogsApi";

const BlogDetail = () => {

  const [bolg, setBlog] = useState({})

  const params = useParams();

  useEffect(() => {
   const getBlogDetail = async () => {
    setBlog(await getBlogDetails(params.blogId))
    }
    getBlogDetail()
  }, [params.blogId])

  return (
    <div className="main-container">
      <section>
        <div className="blog-detail">
          <div className="blog">
            <img className="blog-picture" src={bolg?.image} alt={bolg?.title} />
            <div className="main-content">
              <h2 className="title" >Title : {bolg?.title}</h2>
              <h2 className="author">Author : {bolg?.author}</h2>
              <h3 className="category">Category : {bolg?.category}</h3>
            </div>
          </div>
          <p className="description">{bolg?.description}</p>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
