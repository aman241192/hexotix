import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  editStudent,
} from "../../slice/managementSlice";

const Management = () => {
  const dispatch = useDispatch();

  const studentData = useSelector((state) => state.reducer.management);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        id: Math.random(),
      };
    });
  };

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  console.log("edit data ====>", editData);

  const addBtnHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addStudent(formData));
    handleClose();
  };

  const deleteIconHandler = (id) => {
    console.log("deleteIconHandler", id);
    dispatch(deleteStudent(id));
  };

  const editIconHandler = (row) => {
    console.log("edit row data ==>", row);
    setEditData(row);
    setEditOpen(true);
  };

  const editChangeHandler = (e) => {
    setEditData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("edit form data ==>", editData);
    dispatch(editStudent(editData));
    handleEditClose();
  };
  return (
    <Box>
      <Typography variant="h4">Students details</Typography>

      <br />
      <Button variant="contained" onClick={addBtnHandler} color="success">
        Add student
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right"> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address}</TableCell>

                <TableCell align="right">{row.course}</TableCell>

                <TableCell align="right">
                  <DeleteIcon onClick={() => deleteIconHandler(row.id)} />
                  &nbsp;
                  <EditIcon onClick={() => editIconHandler(row)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={handleClose} open={open}>
        <Box sx={{ height: "70vh" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "25px",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <TextField
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
            ></TextField>
            <TextField
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            ></TextField>
            <TextField
              type="text"
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
            ></TextField>
            <TextField
              type="text"
              name="course"
              placeholder="Enter course"
              onChange={handleChange}
            ></TextField>

            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
          </form>
        </Box>
      </Dialog>

      <Dialog onClose={handleEditClose} open={editOpen}>
        <Box
          sx={{
            height: "70vh",
          }}
        >
          <form
            onSubmit={handleEditSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "25px",
              gap: "25px",
            }}
          >
            <TextField
              type="text"
              name="name"
              value={editData.name}
              onChange={editChangeHandler}
            ></TextField>
            <TextField
              type="text"
              name="email"
              value={editData.email}
              onChange={editChangeHandler}
            ></TextField>
            <TextField
              type="text"
              name="address"
              value={editData.address}
              onChange={editChangeHandler}
            ></TextField>
            <TextField
              type="text"
              name="course"
              value={editData.course}
              onChange={editChangeHandler}
            ></TextField>

            <Button type="submit" variant="contained" color="success">
              Save
            </Button>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Management;
