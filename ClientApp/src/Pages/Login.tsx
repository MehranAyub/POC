import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bgImage from "../Assets/signinbg.png";
import logo from "../Assets/logo.png";
import { Formik, Form } from "formik";
import {
  LoginFormValues,
  LoginSchema,
  LoginInitialValues,
  AdminLoginApi,
} from "../Models/User.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginComplete = () => {
    setIsloading(true);
    navigate("/");
  };
  const onError = () => {
    setIsloading(false);
    setErrorMessage("Invalid Credentials");
  };
  const handleOnSubmit = (values: LoginFormValues) => {
    setErrorMessage("");
    setIsloading(true);
    dispatch(AdminLoginApi(values, onLoginComplete, onError));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            maxWidth: "min-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "90px",
            paddingTop: "35px",
            backgroundColor: "white",
            height: "100%",
            borderRadius: "55px 0 0 0",
          }}
        >
          <img width="110px" src={logo}></img>
          <Typography
            mt="10%"
            width="310px"
            textAlign="center"
            sx={{ color: "#666", fontSize: "14px" }}
            gutterBottom
          >
            Monitor your Dashboard frequently for actionable items
          </Typography>
          <Typography
            mt="12%"
            sx={{ color: "#03396c", fontSize: "24px", fontWeight: "700" }}
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Formik
            initialValues={LoginInitialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              handleOnSubmit(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <>
                <Form
                  style={{
                    marginTop: "12%",
                    width: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    label="User ID"
                    name="userId"
                    id="userId"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userId}
                    error={!!(touched.userId && errors.userId)}
                    helperText={touched.userId ? errors.userId : ""}
                  />
                  <TextField
                    size="small"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                    id="password"
                    fullWidth
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={!!(touched.password && errors.password)}
                    helperText={touched.password ? errors.password : ""}
                  />
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember"
                          size="small"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Link>Reset Password</Link>
                  </Box>
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                    fullWidth
                    endIcon={
                      isLoading ? (
                        <CircularProgress size="16px"></CircularProgress>
                      ) : (
                        ""
                      )
                    }
                  >
                    LOG IN
                  </Button>
                  <Typography mt={2} textAlign="center" color="error">
                    {errorMessage}
                  </Typography>
                </Form>
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default Login;
