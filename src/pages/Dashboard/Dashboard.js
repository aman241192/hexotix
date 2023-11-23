import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.reducer.user.userInfo);

  const registeredData = useSelector(
    (state) => state.reducer.registration.registeredData
  );

  const logoutHandler = () => {
    navigate("/login");
  };

  const studentHandler = () => {
    navigate("/management");
  };

  return (
    <Box sx={{ border: "2px solid red", minHeight: "100vh" }}>
      <AppBar color="success">
        <Toolbar>
          <Typography>Dashboard page</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ border: "2px solid yellow", mt: "80px", minHeight: "80vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Container
              sx={{
                border: "2px solid red",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registeredData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="success"
                onClick={studentHandler}
              >
                Student management
              </Button>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container
              sx={{
                border: "2px solid red",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>username</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
