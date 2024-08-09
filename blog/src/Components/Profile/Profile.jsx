import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BusinessCenterSharp } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TwitCard from "../Home/MiddlePart/TwitCard/TwitCard";
import ProfileModel from "./ProfileModel";
import SnackbarComponent from "../Snackbar/SnackbarComponent";
import { findTwitsLikeContaineUser, findUserById, followUserAction, getUsersTweet } from "../../store/Action";

const Profile = () => {
  const [tabValue, setTabValue] = React.useState("1");
  const { auth, twit} = useSelector((store) => store);//, theme 
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      dispatch(findTwitsLikeContaineUser(param.id));
    } else if (newValue === 1) {
      dispatch(getUsersTweet(param.id));
    }
  };
  useEffect(() => {
     dispatch(getUsersTweet(param.id));
    dispatch(findTwitsLikeContaineUser(param.id));
  }, [param.id, twit.retwit]);

  useEffect(() => {
     dispatch(findUserById(param.id));
     dispatch(getUsersTweet(param.id))
  }, [param.id, auth.user]);

  useEffect(() => {
     setOpenSnackBar(auth.updateUser);
  }, [auth.updateUser]);

  const handleCloseProfileModel = () => setOpenProfileModel(false);

  const handleOpenProfileModel = () => setOpenProfileModel(true);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const handleFollowUser = () => {
    dispatch(followUserAction(param.id));
  };

   console.log("find user ",auth.findUser)

  return (
    <React.Fragment>
      <section
        className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack} />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.findUser?.fullName}
        </h1>
      </section>
      <section>
        <img className="w-[100%] h-[15rem] object-cover"
          src={
             auth.findUser?.backgroundImage ||
            "https://imgs.search.brave.com/hWnsSZSb41zkOlGu_tMmM0j2HyNMFgoMw3Mc1FDQuFQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTEx/MTkyMDA0L3Bob3Rv/L2Nhci12aWV3Lndl/YnA_Yj0xJnM9MTcw/NjY3YSZ3PTAmaz0y/MCZjPUJ2T2lrT0pE/WHFKdl9BSm5JY1lB/cXpsczdRemF6UWpp/N01RX0J0NWo4Q2M9"}
          alt=""/>
      </section>

      <section className="pl-6">
        <div className=" flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="Avatar"
              src={auth.findUser?.image}
            className="transform -translate-y-24 "
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full">
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full bg-blue-700 text-black">
              {auth.findUser?.followed? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <div>
            <div className="flex items-center">
              <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
              {auth.findUser?.verified && <img
              className="ml-2 w-5 h-5"
              src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
              alt=""/>}
            </div>
            <h2 className="text-black font-bold font-sans text-xl" >
              @{auth.findUser?.fullName?.toLowerCase()} Software Developer 👨‍💻
            </h2>
          </div>
          <div className="mt-2 space-y-3">
            {auth.findUser?.bio && <p>{auth.findUser?.bio}</p>}
            <div className="py-1 flex space-x-5">
              <div className="flex items-center text-black">
                <BusinessCenterSharp />
                <p className="ml-2">Education</p>
              </div>
              <div className="flex items-center text-black">
                <LocationOnIcon />
                <p className="ml-2">India</p>
              </div>
              <div className="flex items-center text-black">
                <CalendarMonthIcon />
                <p className="ml-2">Joined June 2022</p>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-1 font-semibold">
                <span>{auth.findUser?.following.length}+</span>
                <span className="text-black">Following</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold">
                <span>{auth.findUser?.followers.length}+</span>
                <span className="text-black">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Box sx={{ width: "100%", typography: "body1", marginTop: "20px" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example">
                <Tab label="Blogs" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit.twits?.map((item, index) => (
                <TwitCard key={index} twit={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">
              {twit.likedTwits?.map((item, index) => (
                <TwitCard key={index} twit={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModel
          open={openProfileModel}
          handleClose={handleCloseProfileModel}
        />
      </section>
      <section>
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
         // open={twit.loading}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </section>
      <section>
        <SnackbarComponent
          handleClose={handleCloseSnackBar}
          open={openSnackBar}
          message={"user updated successfully"}
        />
      </section>
    </React.Fragment>
  );
};

export default Profile;
