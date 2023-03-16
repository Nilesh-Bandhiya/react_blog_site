import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users-slice";
import ConfirmationDialog from "../components/ConfirmationDialog";

const actionHandler = ({ data, handleOpen }) => {
  const changeRoleHandler = () => {
    let newData = { ...data, key: "role" };
    handleOpen(newData);
  };

  const deleteUserHandler = () => {
    let newData = { ...data, key: "delete" };
    handleOpen(newData);
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        size="small"
        sx={{ marginRight: "10px" }}
        onClick={changeRoleHandler}
      >
        Change Role
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={deleteUserHandler}
      >
        Delete
      </Button>
    </>
  );
};

const statusHandler = ({ data, handleOpen }) => {
  let newData = { ...data, key: "status" };
  const changeStatusHandler = () => {
    handleOpen(newData);
  };

  return (
    <>
      <Button
        variant="contained"
        color={`${data?.active ? "success" : "error"}`}
        size="small"
        onClick={changeStatusHandler}
      >
        {data?.active ? "Active" : "In active"}
      </Button>
    </>
  );
};

const idHandler = (e) => {
  return <>{e?.node?.rowIndex + 1}</>;
};

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);

  const filterKeys = ["firstName", "lastName", "email", "phoneNumber", "role"];

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [columnDefs] = useState([
    {
      field: "Id",
      minWidth: 50,
      width: 60,
      maxWidth: 70,
      cellRenderer: idHandler,
    },
    { field: "firstName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "lastName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "email", minWidth: 170, width: 180, maxWidth: 230 },
    { field: "phoneNumber", minWidth: 120, width: 130, maxWidth: 150 },
    { field: "role", minWidth: 50, width: 60, maxWidth: 100 },
    {
      field: "status",
      sortable: false,
      filter: false,
      minWidth: 70,
      width: 80,
      maxWidth: 120,
      cellRenderer: statusHandler,
      cellRendererParams: {
        handleOpen,
      },
    },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 200,
      maxWidth: 350,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleOpen,
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );

  const filterHandler = (data) => {
    return data.filter((user) =>
      filterKeys.some((key) =>
        user[key].toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "4vw",
          width: "85vw",
          margin: "0 auto",
        }}
      >
        <TextField
          id="table-search"
          label="Search here for filter table rows"
          size="small"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "35vw" }}
        />
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          margin: " 0 auto",
          boxSizing: "border-box",
          height: "72vh",
          width: "85vw",
        }}
      >
        <AgGridReact
          rowData={filterHandler(users)}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <ConfirmationDialog open={open} handleClose={handleClose} data={data} />
    </div>
  );
};

export default Users;
