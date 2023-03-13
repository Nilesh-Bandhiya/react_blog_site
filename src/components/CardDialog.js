import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {useDispatch} from "react-redux"
import { getBlogs } from "../store/blogs-slice";

const CardDialog = ({ open, handleDeleteClose, data }) => {
  const dispatch = useDispatch()
  let { id, title } = data;

  const handleDeleteBlog = () => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

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
          <Button onClick={handleDeleteBlog} variant="contained" color="error"  autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardDialog;
