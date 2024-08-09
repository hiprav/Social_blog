import {Avatar,Box,Button,IconButton,Modal,TextField,} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
//import { useDispatch, useSelector } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//import { makePaymentAction } from "../../Store/Payment/Action";

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

const SubscriptionModel = ({ handleClose, open }) => {
  //const dispatch = useDispatch();
 // const { auth } = useSelector((store) => store);
  const [plan,setPlan]=useState('yearly');

  //useEffect(() => {}, [auth.user]);

  const makePayment=()=>{
console.log("plan ",plan)
 //   dispatch(makePaymentAction(plan));
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose} aria-label="delete">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10 hideScrollbar overflow-y-scroll  overflow-x-hidden ">
              <div className="p-5  rounded-md flex items-center justify-between bg-blue-500 shadow-lg">
                <h1 className="text-xl pr-5">
                  Blue subscribers with a verified phone number will get a blue
                  checkmark once approved.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                  alt=""
                />
              </div>

              <div className="flex justify-between border rounded-full px-5 py-3">
                <div>
                  {" "}
                  <span className={`${plan==="yearly"?"text-white":"text-gray-400"} cursor-pointer`} onClick={()=>setPlan("yearly")}>Anunalluy </span>{" "}
                  <span  onClick={()=>setPlan("monthly")} className="text-green-500 text-sm ml-5">SAVE 12%</span>
                </div>
                <p onClick={()=>setPlan("monthly")} className={`${plan==="monthly"?"text-white":"text-gray-400"} cursor-pointer`}>Monthly</p>
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

              <div onClick={makePayment} className=" cursor-pointer flex justify-center bg-blue-600 text-white rounded-full px-5 py-3">
                <span className="line-through italic">₹7,800.00</span>{" "}
                <span className="px-5">₹6,800/year</span>
              </div>
            </div>
          </div>

          {/* <BackdropComponent open={uploading} /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default SubscriptionModel;
