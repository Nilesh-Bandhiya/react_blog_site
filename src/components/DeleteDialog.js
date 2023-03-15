import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";
import { deleteUser } from "../api/usersApi";

const DeleteDialog = ({ open, handleDeleteClose, data }) => {
  const dispatch = useDispatch();
  let { firstName } = data;

  const handleDeleteBlog = async () => {
    await deleteUser(data);
    dispatch(getUsers());
    handleDeleteClose();
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
          {`Are you sure to delete ${firstName}`}
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
          <Button
            onClick={handleDeleteBlog}
            variant="contained"
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
