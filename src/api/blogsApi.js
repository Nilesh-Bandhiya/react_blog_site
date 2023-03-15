import axios from "axios";
import { toast } from "react-toastify";

export const addBlog = async (blog) => {
  try {
    const response = await axios.post(`http://localhost:5000/blogs`, blog);
    const addedBlog = await response?.data;

    if (addedBlog) {
      toast.success("Blog Added Successfully");
      return true;
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateBlog = async (blog) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const currentUserId = token?.userId;
  try {
    if (blog.userId === currentUserId) {
      const response = await axios.put(
        `http://localhost:5000/blogs/${blog.id}`,
        blog
      );
      const updatedBlog = await response?.data;

      if (updatedBlog) {
        toast.success("Blog Updated Successfully");
        return true;
      }
    } else {
      toast.error("You can not Update this Blog");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteBlog = async (blog) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const currentUserId = token?.userId;
  try {
    if (blog.userId === currentUserId) {
      const response = await axios.delete(
        `http://localhost:5000/blogs/${blog.id}`
      );

      if (response.status === 200) {
        toast.success(`${blog.title} Blog Deleted Successfully`);
      }
    } else {
      toast.error("You can not Delete this Blog");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const getMyBlogs = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/blogs/?userId=${id}`
    );
    const myBlogs = await response.data;
    if (myBlogs.length > 0) {
      return myBlogs;
    } else {
      toast.error("No Blogs Found");
    }
  } catch (error) {
    toast.error(error.message);
  }
};
