import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import BlogDialog from "../components/BlogDialog";

const actionHandler = ({handleClickOpen, data}) => {
  const editBlogHandler = () => {
    console.log("viewUserHandler is runing on", data?.title);
    handleClickOpen(data)
  };

  const deleteBlogHandler = () => {
    console.log("deleteUserHandler is runing on", data?.title);
  };

  return (
    <>
      <IconButton
        variant="contained"
        size="small"
        color="success"
        sx={{ marginRight: "20px" }}
        onClick={editBlogHandler}
      >
        <BorderColorIcon />
      </IconButton>
      <IconButton
        variant="contained"
        color="error"
        size="small"
        onClick={deleteBlogHandler}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

const Blogs = () => {

  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({})

  const handleClickOpen = (data) => {
    if(data){
      setFormData(data)
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [columnDefs] = useState([
    { field: "id", minWidth: 50, width: 60, maxWidth: 70 },
    { field: "title", minWidth: 120, width: 120, maxWidth: 200 },
    { field: "description", minWidth: 200, width: 200, maxWidth: 400 },
    { field: "author", minWidth: 120, width: 120, maxWidth: 200 },
    { field: "category", minWidth: 100, width: 100, maxWidth: 150 },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 100,
      maxWidth: 200,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleClickOpen
     }
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
    fetch("http://localhost:5000/blogs")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);


  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
      <div style={{display: "flex", justifyContent:"end", alignItems:"center", height: "4vw", width:"80vw", margin: "0 auto"}}>
        <Button variant="contained" onClick={handleClickOpen} >Add Blog</Button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          margin: "0 auto", 
          boxSizing: "border-box",
          height: "75vh",
          width: "80vw",
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
      <BlogDialog open={open} handleClickOpen={handleClickOpen} formData={formData} handleClose={handleClose} />
    </div>
  )
}

export default Blogs