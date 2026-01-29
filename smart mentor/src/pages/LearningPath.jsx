import { Box, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../App.css";

export default function LearningPath() {
  const overall = ["Overall Progress", 42];
  const titles = [
    {
      title: "Fundamentals",
      percent: 80,
      checks: [
        "JavaScript Basics",
        "HTML & CSS",
        "Git & GitHub",
        "Command Line",
      ],
    },
    {
      title: "Core Skills",
      percent: 45,
      checks: [
        "React Fundamentals",
        "TypeScript",
        "State Management",
        "REST APIs",
      ],
    },
  ];
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
      <Box sx={{ mb: 3, textAlign: "start" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
          Your Learning Path
        </h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Backend Developer Roadmap
        </p>
      </Box>

      <Box sx={{ borderRadius: "25px", border: "1px solid #00000066" }}>
        <Box sx={{ textAlign: "start", marginLeft: "2.5%" }}>
          <h1 style={{ fontSize: "30px" }}>{overall[0]}</h1>
          <p
            style={{
              fontSize: "20px",
              color: "#00000069",
              fontWeight: "300",
              marginTop: "-30px",
            }}
          >
            You're making great progress!
          </p>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "auto 2.5%",
          }}
        >
          <p>Total Completion</p>
          <p>{overall[1]}%</p>
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: 2.5,
            marginTop: "-30px",
            marginBottom: "30px",
          }}
        >
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
                width: `${overall[1]}%`,
                height: "100%",
                backgroundColor: "#0A5ADB",
                borderRadius: "10px",
                transition: "width 0.5s ease",
              }}
            />
          </Box>
        </Box>
      </Box>

      {titles.map((t, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: "25px",
            border: "1px solid #00000066",
            marginTop: "40px",
          }}
        >
          <Box
            sx={{ textAlign: "start", marginLeft: "2.5%", marginTop: "20px" }}
          >
            <label
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginLeft: "-1.5%",
              }}
            >
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
              {t.title}
            </label>
            <p
              style={{
                fontSize: "20px",
                color: "#00000069",
                fontWeight: "300",
                marginTop: "5px",
              }}
            >
              {t.percent}% complete
            </p>
          </Box>
          <Box
            sx={{
              width: "100%",
              padding: 2.5,
              marginTop: "-40px",
            }}
          >
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
                  width: `${t.percent}%`,
                  height: "100%",
                  backgroundColor: "#0A5ADB",
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              />
            </Box>
          </Box>
          {t.checks.map((check,index) => (
            <Box
            key={index}
              sx={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
            >
              <label
                className="checkbox-label"
                style={{
                  fontWeight: "300",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  style={{ color: "#0A5ADB" }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
                {check}
              </label>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
