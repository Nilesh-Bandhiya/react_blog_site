import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";
import { updateUser } from "../api/usersApi";

const RoleDialog = ({ open, handleRoleClose, data }) => {
  const dispatch = useDispatch();

  let { firstName, role } = data;

  const roleChangeHandler = async () => {
    // first we need to change the role of user then we send put request to backend
    let upadtedData = { ...data, role: role === "user" ? "admin" : "user" };

    await updateUser(upadtedData, "role");
    dispatch(getUsers());
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
            role === "user" ? "Admin" : "User"
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
