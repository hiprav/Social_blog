import {Box,Button,Modal,} from "@mui/material";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { useLocation, useNavigate } from "react-router-dom";
//import { useEffect } from "react";
//import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4 ,
  borderRadius: 2,
  outline: "none",
};

const AuthModel = ({handleClose,isOpen}) => {
  
  const location=useLocation()
  const navigate=useNavigate();
  //const {auth}=useSelector(store=>store);
  

  
  const handleNavigate=()=>{
    const path=location.pathname==="/signup"?"/signin":"/signup"
navigate(path)


  }



  // useEffect(()=>{
  //   if(auth.user?.fullName){
  //     handleClose()
  //   }
  // },[auth.user])
  
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-20">
            Create your account
          </h1>
          {/* <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              size="large"
              value={123}//formik.values.fullName
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.fullName && Boolean(formik.errors.fullName)
              helperText={''}//formik.touched.fullName && formik.errors.fullName
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className='w-full'
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              size="large"
              value={123}//formik.values.email
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.email && Boolean(formik.errors.email)
              helperText={''}//formik.touched.email && formik.errors.email
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
              value={123}//formik.values.password
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.password && Boolean(formik.errors.password)
              helperText={''}//formik.touched.password && formik.errors.password
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Date</InputLabel>
            <Select
              name="day"
              value={123}//formik.values.dateOfBirth.day
              onChange={handleDateChange('day')}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              className='w-full'
            //   sx={{width:"120px"}}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Month</InputLabel>
            <Select
              name="month"
              value={123}//formik.values.dateOfBirth.month
              onChange={handleDateChange('month')}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              className='w-full'
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={123}//formik.values.dateOfBirth.year
              onChange={handleDateChange('year')}
              onBlur={formik.handleBlur}
              error={true}//formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              className='w-full'
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            {/* {formik.touched.dateOfBirth && formik.errors.dateOfBirth && ( 
             <div className="text-red-500"></div>  {/*{formik.errors.dateOfBirth} 
            {/* )} 
          </Grid>
          <Grid className='mt-20' item xs={12}>
            <Button
            type="submit"            
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#1d9bf0",
            }}
            variant="contained"
            size="large" >
            Signup
          </Button>
          </Grid>
        </Grid>
      </form> */}
    

{location.pathname==="/signup"? <SignupForm/>:<SigninForm />}
        
        <h1 className="text-center py-5 font-semibold text-lg text-gray-500">{location.pathname==="/singin"?"If you don't have account ?":"Already have account ?"}</h1>
          
          <Button 
          onClick={handleNavigate}
          variant="outlined" 
          sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
             
            }}>{location.pathname==="/signin"?"Signup":"Signin"}</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
