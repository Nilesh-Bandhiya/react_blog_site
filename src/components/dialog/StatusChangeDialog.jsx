import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import { updateUser } from "../../services/api/usersApi";
import { DialogContent, FormControl, InputLabel, Select } from "@mui/material";

const StatusChangeDialog = ({handleClose, open, data}) => {
    const dispatch = useDispatch()

    const [active, setActive] = useState(data?.active)

    useEffect(() => {
        setActive(data?.active)
    },[data?.active])

    const statusChangeHandler = async (e) => {
        e.preventDefault()
        let upadtedData = { ...data, active: active };
        await updateUser(upadtedData, "status");
        dispatch(getUsers());
        handleClose()
    }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Change Status of ${data?.firstName}`}</DialogTitle>
        <DialogContent sx={{margin: "0 auto" }}>
            <FormControl sx={{ m:1 , minWidth: 180 }}>
            <InputLabel id="status">Status</InputLabel>
              <Select
                native
                value={active}    
                labelId="status"
                id="status"
                onChange={(e) => setActive(e.target.value)}
                label="Status"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions sx={{margin:"0 auto 10px auto"}}>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleClose}
            sx={{ marginRight: "5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={statusChangeHandler}
            variant="contained"
            color="success"
            autoFocus
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default StatusChangeDialog;