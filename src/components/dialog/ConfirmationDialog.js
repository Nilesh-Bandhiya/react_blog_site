import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import { deleteUser, updateUser } from "../../services/api/usersApi";
import { deleteBlog } from "../../services/api/blogsApi";
import { getBlogs } from "../../store/blogs-slice";

const ConfirmationDialog = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  let firstName = data?.firstName;
  let active = data?.active;
  let role = data?.role;
  let key = data?.key;
  let title = data?.title;

  const confirmHandler = async () => {
    if (key === "status") {
      // first we need to change the status of user then we send put request to backend
      let upadtedData = { ...data, active: !active };
      await updateUser(upadtedData, key);
      dispatch(getUsers());
    } else if (key === "role") {
      // first we need to change the role of user then we send put request to backend
      let upadtedData = { ...data, role: role === "user" ? "admin" : "user" };
      await updateUser(upadtedData, key);
      dispatch(getUsers());
    } else if (key === "delete") {
      await deleteUser(data);
      dispatch(getUsers());
    } else if (key === "deleteBlog") {
      await deleteBlog(data);
      dispatch(getBlogs());
    } else {
      console.log("not working in this time some error in confirmation dialog");
    }
    handleClose();
  };

  const cardMessage = `Are you sure to ${
    key !== "delete" && key !== "deleteBlog" ? "change" : ""
  } ${key} ${key !== "delete" && key !== "deleteBlog" ? "of" : ""} ${
    firstName ? firstName : title
  }`;

  const cancelBtnColor =
    key === "delete" || key === "deleteBlog" ? "primary" : "error";
  const ConfirmBtnColor =
    key === "delete" || key === "deleteBlog" ? "error" : "primary";
    const confirmBtn =  key !== "delete" && key !== "deleteBlog" ? "Change" : "Delete"

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{cardMessage}</DialogTitle>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color={cancelBtnColor}
            onClick={handleClose}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmHandler}
            variant="contained"
            color={ConfirmBtnColor}
            autoFocus
          >
            {confirmBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
