import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const StatusDialog = ({ open, handleStatusClose, data }) => {
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
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
