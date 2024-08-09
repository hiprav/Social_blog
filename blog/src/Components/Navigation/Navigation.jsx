import React, { useEffect } from "react";
import { navigationMenu } from "../../Utils/NavigationMenu";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../store/Action";


const Navigation = () => {
  const {auth}=useSelector(store=>store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLogoutMenu = Boolean(anchorEl);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleOpenLogoutMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
      dispatch(logout())
    handleClose()
  }
  return (
    <div className="h-screen sticky top-0 ">
      <div>
        <div className="py-5">
          <img
            className="w-10"
            src="https://imgs.search.brave.com/XqOQn_aybIlsRakjfHvr-xiJlnwcVFwapUUBwZAC9cA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xOTct/MTk3MTA1NV9ibG9n/Z2VyLWxvZ28taWNv/bnMtbm8tYXR0cmli/dXRpb24td2hpdGUt/YmxvZy1pY29uLnBu/Zw"
            alt=""/>
        </div>
        <div className="space-y-6">
          {navigationMenu.map((item, index) => (
            <div
              key={item.title || index} 
              onClick={() => item.title === "Profile" ? navigate(`/profile/${auth.user?.id}`) : navigate(`/${item.title.toLowerCase()}`)}
              className="cursor-pointer flex space-x-3 items-center">
              {React.createElement(item.icon)}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-10">
          <Button sx={{width: "100%",borderRadius: "29px", py: "15px", bgcolor: "#1d9bf0",}} variant="contained" size="large">
            New Blog
          </Button>
        </div>
      </div>

      <div className="flex items-center  justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt="Remy Sharp"
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"/>

          <div>
            <p className="font-bol">{auth.user?.fullName}</p>
          <p className="opacity-70">@{auth.user?.fullName.split(" ")[0]}</p>
          </div>
        </div>
        <Button
          id="basic-button"
          aria-controls={openLogoutMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openLogoutMenu ? 'true' : undefined}
          onClick={handleOpenLogoutMenu}>
          <MoreHorizIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openLogoutMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
