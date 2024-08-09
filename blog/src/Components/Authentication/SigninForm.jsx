 import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../store/Action";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SigninForm = () => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("in sigin");
      dispatch(loginUser(values));
    },
  });
const clic=()=>{

}
  useEffect(() => {
   
  }, [clic]);
  return (
    <form onSubmit={formik.handleSubmit}>
  
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className="w-full"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid className="mt-20" item xs={12}>
          <Button onClick={clic}
            type="submit"
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#1d9bf0",
            }}
            variant="contained"
            size="large"
          >
            Signin
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
