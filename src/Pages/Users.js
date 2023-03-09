import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import cookie from 'react-cookies'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const actionHandler = () =>{
  return <>
  <Button variant="contained" >View</Button>
  <Button variant="contained">Delete</Button>
  </>
}

const Users = () => {
  console.log("token", cookie.load('token'));

  const navigate = useNavigate()

  useEffect(() => {
    if(!cookie.load('token')){
      navigate("/signin")
    }
  },[navigate])


  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);



   // eslint-disable-next-line
  const [columnDefs] = useState([
    { field: "id", width: 50, },
    { field: "firstName", width: 50, },
    { field: "lastName", width: 50, },
    { field: "email", width: 50, },
    { field: "phoneNumber", width: 50, },
    { field: "role", width: 50, },
    { field: "Actions", cellRenderer: actionHandler, minWidth: 400,  },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    filter: true,
    // floatingFilter: true
  }), []);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      <button onClick={buttonListener}>Push Me</button>
      <div
        className="ag-theme-alpine"
        style={{ height: 800, width: 1000, margin: "0px auto" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default Users;
