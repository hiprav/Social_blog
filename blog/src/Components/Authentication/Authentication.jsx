import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthModel from "./AuthModel";
import { useLocation, useNavigate } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { GoogleLogin } from "@react-oauth/google";
//import { loginWithGoogleAction } from "../../Store/Auth/Action";

const Authentication = () => {
  const [authModelOpen, setAuthModelOpen] = useState(false);
 // const { auth } = useSelector((store) => store);
  const location = useLocation();
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const handleAuthModelClose = () => {
    setAuthModelOpen(false);
    navigate("/");
  };

  const handleAuthModelOpen = (path) => {
    setAuthModelOpen(true);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setAuthModelOpen(true);
    }
  }, [location.pathname]);

  const loginWithGoole = (res) => {
    console.log("res : ", res);
   // dispatch(loginWithGoogleAction(res));
    // return
  };

  return (
    <div className="bg-cyan-800 " >
      {" "}
      <Grid className="overflow-y-hidden " container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-100 h-screen ximage"
            src="https://imgs.search.brave.com/iuFS46mX0zX1O4Oizeh6giAPECLZ5qt0Mjlgx6GWkj4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yOS8wNS80NS9h/c3Ryb25vbXktMTg2/NzYxNl82NDAuanBn"
            alt=""/>

          <div className="absolute top-[26%] left-[19%]">
            {/* <svg height="300px" width="300px"
              viewBox="0 0 24 24"//https://imgs.search.brave.com/XqOQn_aybIlsRakjfHvr-xiJlnwcVFwapUUBwZAC9cA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xOTct/MTk3MTA1NV9ibG9n/Z2VyLWxvZ28taWNv/bnMtbm8tYXR0cmli/dXRpb24td2hpdGUt/YmxvZy1pY29uLnBu/Zw
              aria-hidden="true"
              className="r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"> */}
              {/* <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g> */}
              <img src="/blogimg.png" alt="" className="w-56"/>
            {/* </svg> */}
          </div>

          {/* 
        <img className=" w-[50rem] absolute -top-5" src="https://cdn.pixabay.com/photo/2021/03/02/12/04/twitter-6062249_640.png" alt="" /> */}
        </Grid>
        <Grid className="px-10" item lg={5} xs={12} >
          <div className="py-10">
            <img
              className="w-16"
              src="https://pbs.twimg.com/media/F1iAD_iaYAAu7I3?format=jpg&name=small"
              alt=""
            />
          </div>

          <h1 className="font-bold text-7xl">Blog</h1>

          <h1 className="font-bold text-3xl py-16">Join Club Today</h1>

          <div className="w-[60%] ">
            <div className="w-full ">
              <button 
            className="w-full flex justify-center items-center border border-gray-400 py-2 px-7 rounded-full bg-white shadow-md text-gray-600">
              <img
                src="https://www.google.com/images/hpp/ic_wahlberg_product_core_48.png8.png"
                alt="Google Logo"
                className="h-6 w-6 mr-2"
              />
              Sign Up with Google
            </button>
              {/* <GoogleLogin
                width={330}
                onSuccess={loginWithGoole}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}
              <p className="py-3 text-center">OR</p>
              <Button
                onClick={() => handleAuthModelOpen("/signup")}
                sx={{
                  width: "100%",
                  borderRadius: "29px",
                  py: "7px",
                  bgcolor: "#1d9bf0",
                }}
                variant="contained"
                size="large"
              >
                Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div className="mt-5">
              <h1 className="font-bold text-xl ">Already Have Account?</h1>
              <Button
              
                onClick={() => handleAuthModelOpen("/signin")}
                sx={{
                  width: "100%",
                  borderRadius: "29px",
                  py: "7px",
                  
                }}
                variant="outlined"
                size="large"
              >
                Signin
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel isOpen={authModelOpen} handleClose={handleAuthModelClose} />
    </div>
  );
};

export default Authentication;
