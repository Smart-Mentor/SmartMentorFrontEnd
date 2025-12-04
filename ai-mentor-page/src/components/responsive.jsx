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
import AnalyzeSkills from "../assets/AnalyzeSkills.png";
import CareerAdvice from "../assets/CareerAdvice.png";
import GenerateRoadmap from "../assets/GenerateRoadmap.png";
import ReviewCV from "../assets/ReviewCV.png";
import SendBtn from "../assets/send.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        <Toolbar sx={{ display: "flex", justifyContent:"space-between"}}>
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
        <div
          style={{
            border: "1px solid #00000033",
            borderRadius: "25px",
            fontFamily: "Hanuman",
            Width: "30%",
          }}
        >
          <p style={{ fontSize: "30px", fontWeight: "700" }}>Quick Actions</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "75px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F0F099",
                borderRadius: "16px",
                fontSize: "24px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img src={AnalyzeSkills} alt="" width={"24px"} height={"24px"} />
              <span>Analyze Skills</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F0F099",
                borderRadius: "16px",
                fontSize: "24px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img src={CareerAdvice} alt="" width={"24px"} height={"24px"} />
              <span>Career Advice</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F0F099",
                borderRadius: "16px",
                fontSize: "24px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img
                src={GenerateRoadmap}
                alt=""
                width={"24px"}
                height={"24px"}
              />
              <span>Generate Roadmap</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F0F099",
                borderRadius: "16px",
                fontSize: "24px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img src={ReviewCV} alt="" width={"24px"} height={"24px"} />
              <span>Review CV</span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "43%",
            border: "1px solid #00000033",
            borderRadius: "16px",
            fontFamily: "Hanuman",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "25px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <img
              src={LampLight}
              alt=""
              width={"42.0753288269043px"}
              height={"42.0753288269043px"}
            />
            <p style={{ fontSize: "30px", fontWeight: "700" }}>
              AI Mentor Chat
            </p>
          </div>
          <div style={{ border: "1px solid #00000033", height: "56%" }}>
            <div
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: "16px",
                height: "63%",
              }}
            >
              <p style={{ fontWeight: "300" }}>
                Hello! I'm your AI Career Mentor. I can help you with skill
                analysis, career advice, learning roadmaps, and more. How can I
                assist you today?
              </p>
              <div
                style={{
                  display: "flex",
                  marginLeft: "5px",
                  gap: "10px",
                  marginBottom: "40px",
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Like} alt="" />
                </button>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Dislike} alt="" />
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              margin: "20px 0px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Ask me anything about your career......"
              variant="outlined"
              sx={{
                width: "80%",
                "& .MuiOutlinedInput-root fieldset": {
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D980",
                  border: "none",
                  fontFamily: "Hanuman",
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "Hanuman",
                  fontSize: "18px",
                },
                "& .MuiInputBase-root": { fontFamily: "Hanuman" },
              }}
            />
            <Button
              style={{ width: "15%", height: "60px", textTransform: "none" }}
              variant="contained"
            >
              <img src={SendBtn} alt="" />
            </Button>
          </div>
        </div>
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
