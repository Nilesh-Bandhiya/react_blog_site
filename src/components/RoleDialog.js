import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";
import { toast } from "react-toastify";

const RoleDialog = ({ open, handleRoleClose, data }) => {
  const dispatch = useDispatch();

  let { id, firstName, role } = data;

  const roleChangeHandler = () => {
    // first we need to change the role of user then we send put request to backend
    let upadtedData = { ...data, role: role === "user" ? "admin" : "user" };

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upadtedData),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(getUsers());
        toast.success(
          `Now ${firstName} is ${role === "user" ? "admin" : "user"}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
        dispatch(getUsers());
      });
    handleRoleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleRoleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to change ${firstName}'s role ${role} to ${
            role === "user" ? "admin" : "user"
          }`}
        </DialogTitle>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleRoleClose}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button onClick={roleChangeHandler} variant="contained" autoFocus>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleDialog;
