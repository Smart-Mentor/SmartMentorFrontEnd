import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import Profile from "../assets/user.png";
import StudyPlanner from "../assets/calendar.png";
import Community from "../assets/users.png";
import Projects from "../assets/folder-minus.png";
import JobTrends from "../assets/trending-up.png";
import GapAnalysis from "../assets/bar-chart.png";
import Skills from "../assets/target.png";
import LearningPath from "../assets/book-open.png";
import AiMentor from "../assets/Lamp_light.png";
import DashboardIcon from "../assets/Frame.png";
import Logo from "../assets/Logo.png";
import "../App.css"; 

const drawerWidth = 262;

export default function Layout() {

  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      navigate(`/${newAlignment.replaceAll(" ", "").toLowerCase()}`);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { name: "Dashboard", image: DashboardIcon },
    { name: "AI Mentor", image: AiMentor },
    { name: "Learning Path", image: LearningPath },
    { name: "Skills", image: Skills },
    { name: "Gap Analysis", image: GapAnalysis },
    { name: "Job Trends", image: JobTrends },
    { name: "Projects", image: Projects },
    { name: "Community", image: Community },
    { name: "Study Planner", image: StudyPlanner },
    { name: "Profile", image: Profile },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ height: "65px" }} />
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        orientation="vertical"
        sx={{ width: "100%" }}
      >
        <List sx={{ width: "100%", p: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ToggleButton
                onClick={handleDrawerClose} // Close the menu after selecting 
                value={item.name}
                sx={{
                  "&.MuiToggleButton-root.Mui-selected": { // The selected menuItem stays blue on hover
                    backgroundColor: "#0A5ADB",
                    color: "white",
                  },
                  "&.Mui-selected img": { filter: "brightness(0) invert(1)" },
                  height: "56px",
                  border: "none",
                  borderRadius: "12px",
                  width: "100%",
                  justifyContent: "flex-start",
                  px: 2,
                  textTransform: "none",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "24px", height: "24px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Hanuman",
                      fontSize: "16px",
                      fontWeight: 500,
                    },
                  }}
                />
              </ToggleButton>
            </ListItem>
          ))}
        </List>
      </ToggleButtonGroup>
    </div>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "white",
          boxShadow: "none",
          borderBottom: "1.48px solid #0000001f",
          height: "65px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "65px",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <IconButton
              sx={{
                display: { sm: "none" },
                color: "#00000066",
                p: 1,
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "70px", height: "70px" }}
            />
            <Typography
              className="page-title" // Page-title gradient
              sx={{
                fontFamily: "Haettenschweiler",
                fontSize: { xs: "32px", sm: "46px" },
                // color: "black",
                lineHeight: 1,
              }}
            >
              SmartMentor
            </Typography>
          </Box>

          <Box>
            <img
              src={Profile}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Permanent */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1.48px solid #0000001f",
              bgcolor: "#FAFAFA",
              marginTop: "20px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Sidebar Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#FAFAFA",
          },
        }}
        ModalProps={{
          keepMounted: true,
          sx: {
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: "65px",
          minHeight: "calc(100vh - 65px)",
          bgcolor: "#f9f9f9",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};