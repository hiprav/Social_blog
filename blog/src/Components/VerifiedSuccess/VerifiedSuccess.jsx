import { Alert, Box, Button, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from 'react-router-dom'
//import { verifiedAccountAction } from '../../Store/Payment/Action';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  //   height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
  outline: "none",
  overflow: "scroll-y",
};
const VerifiedSuccess = () => {
  const navigate = useNavigate()
  // const {auth}=useSelector(store=>store);
  //  const dispatch=useDispatch();
  const urlParams = new URLSearchParams(window.location.search);


  useEffect(() => {
    //dispatch(verifiedAccountAction(urlParams.get("razorpay_payment_link_id")))
  }, [])
  return (
    <div className='px-36 flex flex-col h-screen justify-center items-center'>
      <Box sx={style}>


        <div className=" space-y-10 p-10 ">
          <div className='flex flex-col items-center justify-center'>
            <img
              className="w-16 h-16  "
              src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
              alt=""
            />
            <Alert className='my-5 font-bold text-3xl' severity="success">Congratulations Your Account Is Verified</Alert>
          </div>





          <div className="space-y-3">
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Prioritized rankings in conversations and search
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon
                sx={{
                  width: "7px",
                  height: "7px",
                  padding: "0px",
                  border: "",
                }}
              />
              <p className=" text-xs">
                See approximately twice as many Tweets between ads in your
                For You and Following timelines.
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Add bold and italic text in your Tweets.
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Post longer videos and 1080p video uploads.
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                All the existing Blue features, including Edit Tweet,
                Bookmark Folders and early access to new features.
              </p>
            </div>
          </div>

          <div>

            <Button className="rounded-full my-5" sx={{ width: "100%", borderRadius: "25px", padding: "12px 0px" }} onClick={() => navigate(`/profile/`)} variant='contained'>Go To Profile</Button>
          </div>
        </div>




      </Box>

    </div>
  )
}

export default VerifiedSuccess