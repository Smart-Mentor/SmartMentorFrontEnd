import { Box, Typography, LinearProgress, Grid, Paper, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function LearningPath() {
  const overallProgress = 100;

  const stats = [
    { label: "Ready", value: 4, color: "#1976d2", bg: "#E3F2FD", icon: "check" },
    { label: "Weak", value: 0, color: "#fbc02d", bg: "#FFF8E1", icon: "trend" },
    { label: "Missing", value: 0, color: "#d32f2f", bg: "#FDECEA", icon: "target" },
  ];

  const skills = [
    { name: "C#", level: "Advanced", progress: 100 },
    { name: "SQL", level: "Advanced", progress: 100 },
    { name: "Python", level: "Intermediate", progress: 70 },
    { name: "Docker", level: "Beginner", progress: 40 },
  ];

  return (
    <Box sx={{ p: 4, fontFamily: "sans-serif" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        Your Learning Path
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Backend Developer Roadmap
      </Typography>

      {/* Overall Progress */}
      <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Overall Progress
        </Typography>
        <Typography color="primary" mt={1}>
          🎉 You're job ready!
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography>Total Completion</Typography>
          <Typography fontWeight="bold">{overallProgress}%</Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={overallProgress}
          sx={{ mt: 1, height: 8, borderRadius: 5 }}
        />
      </Paper>

      {/* Stats */}
      <Grid container spacing={2} mb={3} sx={{ width: "100%" }}>
        {stats.map((item, i) => (
          <Grid item xs={12} md={4} key={i} sx={{ flexGrow: 1 }}>
            <Paper sx={{ p: 2, borderRadius: 4, display: "flex", alignItems: "center", gap: 2, width: "100%", height: "100%" }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon === "check" && (
                  <CheckCircleIcon sx={{ color: item.color }} />
                )}
                {item.icon === "trend" && (
                  <RadioButtonUncheckedIcon sx={{ color: item.color }} />
                )}
                {item.icon === "target" && (
                  <RadioButtonUncheckedIcon sx={{ color: item.color }} />
                )}
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography color="text.secondary">{item.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Button */}
      <Box textAlign="center" mb={3}>
        <Button variant="contained" sx={{ borderRadius: 5, px: 4 }}>
          job Ready
        </Button>
      </Box>

      {/* Skills */}
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Ready Skills
        </Typography>
        <Typography color="text.secondary" mb={2}>
          4 skills at required level
        </Typography>

        {skills.map((skill, i) => (
          <Box key={i} mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography>
                <CheckCircleIcon sx={{ fontSize: 16, mr: 1, color: "#1976d2" }} />
                {skill.name}
              </Typography>
              <Typography color="text.secondary">{skill.level}</Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={skill.progress}
              sx={{ mt: 1, height: 6, borderRadius: 5 }}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
