import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {useDispatch} from "react-redux"
import { getUsers } from "../store/users-slice";
import { toast } from 'react-toastify';

const StatusDialog = ({ open, handleStatusClose, data }) => {

  const dispatch = useDispatch()

  let { id, firstName, active } = data;

  const statusChangeHandler = () => {
    // first we need to change the status of user then we send put request to backend
    let upadtedData = { ...data, active: !active };

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upadtedData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(`Now ${firstName} is ${!active ? "Active" : "Inactive"}`)
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message)
      });
    handleStatusClose();
    dispatch(getUsers())
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
