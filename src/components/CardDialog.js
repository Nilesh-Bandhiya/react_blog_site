import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux"
import { getBlogs } from "../store/blogs-slice";
import { toast } from 'react-toastify';

const CardDialog = ({ open, handleDeleteClose, data, currentUserId }) => {
  const dispatch = useDispatch()
  let { id, title, userId } = data;

  const handleDeleteBlog = () => {

    if (userId === currentUserId) {
      fetch(`http://localhost:5000/blogs/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Blog Deleted Successfully")
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.success(error.message)
        });

    } else {
      toast.error("You can not Delete this Blog")
    }

    handleDeleteClose();
    dispatch(getBlogs())
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to delete ${title}`}
        </DialogTitle>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            onClick={handleDeleteClose}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteBlog} variant="contained" color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardDialog;
