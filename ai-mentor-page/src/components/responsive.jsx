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
import Dashboard from "../assets/Frame.png";
import Logo from "../assets/Logo.png";
import LampLight from "../assets/Lamp_light2.png";
import Like from "../assets/thumb_up.png";
import Dislike from "../assets/thumb_down.png";
import SendBtn from "../assets/send.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import QuickActions from "./QuickActions";
import MentorChat from "./MentorChat";

const drawerWidth = 262;

function ResponsiveDrawer(props) {
  const [alignment, setAlignment] = useState("AI Mentor");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ height: "65px" }} />
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <List>
          {[
            { name: "Dashboard", image: Dashboard },
            { name: "AI Mentor", image: AiMentor },
            { name: "Learning Path", image: LearningPath },
            { name: "Skills", image: Skills },
            { name: "Gap Analysis", image: GapAnalysis },
            { name: "Job Trends", image: JobTrends },
            { name: "Projects", image: Projects },
            { name: "Community", image: Community },
            { name: "Study Planner", image: StudyPlanner },
            { name: "Profile", image: Profile },
          ].map((text) => (
            <ToggleButton
              key={text.name}
              value={text.name}
              sx={{
                "&.MuiToggleButton-root.Mui-selected": {
                  backgroundColor: "#0A5ADB",
                  color: "white",
                  transition: ".3s",
                },
                "&.Mui-selected img": {
                  filter: "brightness(0) invert(1)",
                },
                height: "8.7vh",
                border: "none",
                textTransform: "none",
                borderRadius: "12px",
                width: "90%",
              }}
            >
              <ListItem key={text.name} disablePadding>
                <ListItemButton onClick={handleDrawerToggle}>
                  <ListItemIcon>
                    <img src={text.image} alt="" />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    primaryTypographyProps={{ sx: { fontFamily: "Hanuman" } }}
                  />
                </ListItemButton>
              </ListItem>
            </ToggleButton>
          ))}
        </List>
      </ToggleButtonGroup>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "white",
          boxShadow: "none",
          borderBottom: "1.48px solid #0000001f",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display={"flex"}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "#00000066" }}
            >
              <MenuIcon />
            </IconButton>
            <img src={Logo} alt="" width={"70px"} height={"70px"} />
            <Typography
              className="page-title"
              noWrap
              sx={{
                fontFamily: "Haettenschweiler",
                fontSize: "45.61px",
              }}
            >
              SmartMentor
            </Typography>
          </Box>
          <img src={Profile} alt="" />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          marginTop: "60px",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <QuickActions />

        <MentorChat />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
