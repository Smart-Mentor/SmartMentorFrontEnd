import React from "react";
import { Box, TextField, Button } from "@mui/material";
import AnalyzeSkills from "../assets/AnalyzeSkills.png";
import CareerAdvice from "../assets/CareerAdvice.png";
import GenerateRoadmap from "../assets/GenerateRoadmap.png";
import ReviewCV from "../assets/ReviewCV.png";
import SendBtn from "../assets/send.png";
import LampLight from "../assets/Lamp_light2.png";
import Like from "../assets/thumb_up.png";
import Dislike from "../assets/thumb_down.png";

const drawerWidth = 262;

const quickActions = [
  { img: AnalyzeSkills, text: "Analyze Skills" },
  { img: CareerAdvice, text: "Career Advice" },
  { img: GenerateRoadmap, text: "Generate Roadmap" },
  { img: ReviewCV, text: "Review CV" },
];

const Aiagent = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "space-around" },
        alignItems: "flex-start",
        marginTop: "60px",
        gap: 3,
      }}
    >
      {/* Quick Actions */}
      <Box
        sx={{
          border: "1px solid #00000033",
          borderRadius: 3,
          fontFamily: "Hanuman",
          width: { xs: "90%", md: "30%" },
          p: 2,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <p style={{ fontSize: "28px", fontWeight: 700 }}>Quick Actions</p>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {quickActions.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F0F099",
                borderRadius: 2,
                fontSize: { xs: "16px", md: "20px" },
                gap: 1.5,
                px: 2,
                py: 1.2,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { backgroundColor: "#E0E0E0" },
              }}
            >
              <img src={item.img} alt={item.text} width={24} height={24} />
              <span>{item.text}</span>
            </Box>
          ))}
        </Box>
      </Box>

      {/* AI Mentor Chat */}
      <Box
        sx={{
          width: { xs: "90%", md: "60%" },
          border: "1px solid #00000033",
          borderRadius: 3,
          fontFamily: "Hanuman",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <img src={LampLight} alt="AI Mentor" width={42} height={42} />
          <p style={{ fontSize: "28px", fontWeight: 700 }}>AI Mentor Chat</p>
        </Box>

        {/* Chat Box */}
        <Box
          sx={{
            border: "1px solid #00000033",
            borderRadius: 2,
            height: { xs: "250px", md: "300px" },
            backgroundColor: "#D9D9D980",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: 300 }}>
            Hello! I'm your AI Career Mentor. I can help you with skill analysis, career advice,
            learning roadmaps, and more. How can I assist you today?
          </p>

          {/* Like / Dislike */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="text" sx={{ minWidth: "auto", p: 0 }}>
              <img src={Like} alt="Like" width={30} height={30} />
            </Button>
            <Button variant="text" sx={{ minWidth: "auto", p: 0 }}>
              <img src={Dislike} alt="Dislike" width={30} height={30} />
            </Button>
          </Box>
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Ask me anything about your career..."
            variant="outlined"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root fieldset": {
                borderRadius: 3,
                backgroundColor: "#D9D9D980",
                border: "none",
              },
              "& .MuiInputLabel-root": { fontFamily: "Hanuman", fontSize: { xs: "14px", md: "16px" } },
              "& .MuiInputBase-root": { fontFamily: "Hanuman" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: { xs: "50px", md: "60px" },
              width: { xs: "60px", md: "80px" },
              minWidth: "auto",
              borderRadius: 3,
              p: 0,
            }}
          >
            <img src={SendBtn} alt="Send" width={24} height={24} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Aiagent;
