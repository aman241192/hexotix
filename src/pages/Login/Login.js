import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../../slice/userSlice";
import { Link } from "react-router-dom/dist";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredData = useSelector(
    (state) => state.reducer.registration.registeredData
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: string()
        .required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),

    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values));
      const isExist = registeredData?.find(
        (item) => item.email === values.email
      );

      const userInfo = JSON.stringify(values);

      if (isExist) {
        navigate("/dashboard");
        dispatch(addUserInfo(values));
        localStorage.setItem("userInfo", userInfo);
      } else {
        alert("user not found");
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          height: "600px",
          width: "400px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "25px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Login</Typography>
            <Link to="/registration">Registration page</Link>
          </Box>

          <Box>
            <TextField
              type="email"
              placeholder="Enter your email"
              name="email"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            ></TextField>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </Box>
          <Box>
            <TextField
              type="password"
              placeholder="Enter your password"
              name="password"
              required
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            ></TextField>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: "25px", width: "60px" }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
