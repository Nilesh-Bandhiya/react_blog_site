import React from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {

const params = useParams();

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
    </div>
  )
}

export default BlogDetail