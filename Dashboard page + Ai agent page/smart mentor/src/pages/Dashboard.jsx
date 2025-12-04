import React from "react";
import { Box } from "@mui/material";

const Dashboard = () => {
  const progressCards = [
    { title: "Profile Completion", percent: 75 },
    { title: "Career Readiness", percent: 62 },
    { title: "Learning Progress", percent: 45 },
  ];

  const nextSteps = [
    { title: "Complete Gap Analysis", desc: "Identify missing skills for your target career" },
    { title: "Update Your Skills", desc: "Add your latest accomplishments" },
    { title: "Explore Job Trends", desc: "See what's in demand in Egyptian tech market" },
  ];

  const trendingSkills = ["React", "Node.js", "Python", "TypeScript", "AWS", "Docker"];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "100%",
        fontFamily: "Hanuman",
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700 }}>Welcome back, Ahmed! 👋</h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Here's your learning progress overview
        </p>
      </Box>

      {/* PROGRESS CARDS */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {progressCards.map((card, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "90%", sm: "calc(50% - 12px)", md: "calc(33% - 20px)" },
              padding: 2.5,
              borderRadius: 3,
              border: "1px solid #ddd",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "15px", color: "#555", fontWeight: 700 }}>{card.title}</p>
            <h2 style={{ fontSize: "28px", margin: "8px 0" }}>{card.percent}%</h2>
            <Box
              sx={{
                height: "8px",
                backgroundColor: "#E5E5E5",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${card.percent}%`,
                  height: "100%",
                  backgroundColor: "#0A5ADB",
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* NEXT STEPS */}
      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 3,
          p: 3,
          mb: 4,
        }}
      >
        <h2 style={{ fontSize: "22px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#0A5ADB" }}>🔵</span> Recommended Next Steps
        </h2>
        <p style={{ mt: 1, color: "#666", textAlign: "start" }}>Continue your learning journey</p>

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {nextSteps.map((step, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <p style={{ fontWeight: 600, fontSize: "18px" }}>{step.title}</p>
                <p style={{ fontSize: "14px", color: "#777" }}>{step.desc}</p>
              </Box>
              <span style={{ fontSize: "22px" }}>→</span>
            </Box>
          ))}
        </Box>
      </Box>

      {/* JOB MARKET */}
      <Box
        sx={{
          backgroundColor: "#ECF5FD",
          p: 3,
          borderRadius: 3,
          border: "1px solid #cce4ff",
          mb: 4,
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>📈 Job Market Snapshot</h2>
        <p style={{ color: "#555", mt: 1, textAlign: "start" }}>
          Top trending skills in Egypt this month
        </p>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
          {trendingSkills.map((tag) => (
            <Box
              key={tag}
              sx={{
                px: 2,
                py: 0.5,
                backgroundColor: "white",
                borderRadius: 2,
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        <p
          style={{
            mt: 2,
            color: "#0A5ADB",
            cursor: "pointer",
            fontWeight: 600,
            textAlign: "start",
          }}
        >
          View full trends →
        </p>
      </Box>
    </Box>
  );
};

export default Dashboard;
