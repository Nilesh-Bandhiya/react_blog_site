import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

const actionHandler = (e) => {
  const viewUserHandler = () => {
    console.log("viewUserHandler is runing on", e.data?.firstName);
  };
  const changeRoleHandler = () => {
    console.log("changeRoleHandler is runing on", e.data?.firstName);
  };

  const deleteUserHandler = () => {
    console.log("deleteUserHandler is runing on", e.data?.firstName);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ marginRight: "10px" }}
        onClick={viewUserHandler}
      >
        View
      </Button>
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

const statusHandler = (e) => {
  const changeStatusHandler = () => {
    console.log("changeStatusHandler runing on", e.data?.active);
  };

  return (
    <>
      <Button
        variant="contained"
        color={`${e?.data?.active ? "success" : "error"}`}
        size="small"
        onClick={changeStatusHandler}
      >
        {e?.data?.active ? "Active" : "In active"}
      </Button>
    </>
  );
};

const Users = () => {

  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "id", minWidth: 50, width: 60, maxWidth: 70 },
    { field: "firstName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "lastName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "email", minWidth: 150, width: 150, maxWidth: 200 },
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
    },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 100,
      maxWidth: 300,
      cellRenderer: actionHandler,
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

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData)).catch((err) => console.log(err.message))
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        className="ag-theme-alpine"
        style={{
          margin: " 0 auto",
          boxSizing: "border-box",
          height: "80vh",
          width: "84vw",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default Users;
