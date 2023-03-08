import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";

const Users = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
    { field: "password" },
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
