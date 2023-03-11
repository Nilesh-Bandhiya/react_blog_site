import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import BlogDialog from "../components/BlogDialog";
import CardDialog from "../components/CardDialog";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const actionHandler = ({ handleDeleteOpen, handleEditOpen, data }) => {
  const editBlogHandler = () => {
    console.log("viewUserHandler is runing on", data?.title);
    handleEditOpen(data);
  };

  const deleteBlogHandler = () => {
    console.log("deleteUserHandler is runing on", data?.title);
    handleDeleteOpen(data);
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

const titleLinkHandler = ({ data, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <Link to={`/${data.id}`} className="link-blue">
          {data.title}
        </Link>
      ) : (
        <>{data.title}</>
      )}
    </>
  );
};

const Blogs = () => {
  let token = cookie.load("token");
  let currentUserId = token?.userId;
  let isAdmin = token?.role === "admin";

  const [rowData, setRowData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});

  const handleEditOpen = (data) => {
    setFormData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = (data) => {
    setData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "id", minWidth: 50, width: 60, maxWidth: 70 },
    {
      field: "title",
      minWidth: 120,
      width: 120,
      maxWidth: 200,
      cellRenderer: titleLinkHandler,
      cellRendererParams: {
        isLoggedIn: currentUserId,
      },
    },
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
        handleEditOpen,
        handleDeleteOpen,
      },
    },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      setColumnDefs([
        { field: "id", minWidth: 50, width: 60, maxWidth: 70 },
        {
          field: "title",
          minWidth: 150,
          width: 150,
          maxWidth: 250,
          cellRenderer: titleLinkHandler,
          cellRendererParams: {
            isLoggedIn: currentUserId,
          },
        },
        { field: "description", minWidth: 250, width: 250, maxWidth: 500 },
        { field: "author", minWidth: 130, width: 130, maxWidth: 250 },
        { field: "category", minWidth: 120, width: 120, maxWidth: 200 },
      ]);
    }
  }, [isAdmin, currentUserId]);

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
      .then((rowData) => setRowData(rowData))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        {isAdmin && (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              height: "4vw",
              width: "80vw",
              margin: "0 auto",
            }}
          >
            <Button variant="contained" onClick={handleEditOpen}>
              Add Blog
            </Button>
          </div>
        )}
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
      <BlogDialog
        open={editOpen}
        formData={formData}
        handleEditClose={handleEditClose}
        currentUserId={currentUserId}
      />
      <CardDialog
        open={deleteOpen}
        data={data}
        handleDeleteClose={handleDeleteClose}
      />
    </div>
  );
};

export default Blogs;
