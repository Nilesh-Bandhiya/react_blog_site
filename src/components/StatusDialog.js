import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";
import { updateUser } from "../api/usersApi";

const StatusDialog = ({ open, handleStatusClose, data }) => {
  const dispatch = useDispatch();

  let { firstName, active } = data;

  const statusChangeHandler = async () => {
    // first we need to change the status of user then we send put request to backend
    let upadtedData = { ...data, active: !active };
    await updateUser(upadtedData, "status");
    dispatch(getUsers());
    handleStatusClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleStatusClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to change status of ${firstName}`}
        </DialogTitle>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleStatusClose}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button onClick={statusChangeHandler} variant="contained" autoFocus>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusDialog;
