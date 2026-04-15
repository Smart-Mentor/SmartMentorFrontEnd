import React from "react";

const skills = [
  { name: "React", level: 80 },
  { name: "Node.js", level: 70 },
  { name: "TypeScript", level: 60 },
  { name: "MongoDB", level: 50 },
  { name: "Git", level: 80 },
];

const recommended = ["GraphQL", "Next.js", "Redis", "PostgreSQL", "AWS", "Docker"];

const improve = [
  { name: "System Design", level: "high" },
  { name: "Testing", level: "medium" },
  { name: "CI/CD", level: "medium" },
];

const SkillsPage = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Skills Management</h1>
      <p style={styles.subtitle}>
        Track and improve your technical abilities
      </p>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <p>Total Skills</p>
          <h2>5</h2>
        </div>
        <div style={styles.card}>
          <p>Average Proficiency</p>
          <h2>69%</h2>
        </div>
        <div style={styles.card}>
          <p>Expert Level</p>
          <h2>2</h2>
        </div>
      </div>

      {/* Skills */}
      <div style={styles.mainCard}>
        <h3>Your Skills</h3>
        <p style={{ color: "#777" }}>Current proficiency levels</p>

        {skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <div style={styles.skillHeader}>
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${skill.level}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomContainer}>
        {/* Recommended */}
        <div style={{ ...styles.mainCard, flex: 1 }}>
          <h3>Recommended Skills</h3>
          <p style={{ color: "#777" }}>
            Skills that complement your profile
          </p>

          <div style={styles.tagsContainer}>
            {recommended.map((item, i) => (
              <span key={i} style={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Improve */}
        <div style={{ ...styles.mainCard, flex: 1 }}>
          <h3>Areas to Improve</h3>
          <p style={{ color: "#777" }}>
            Focus on these for maximum impact
          </p>

          {improve.map((item, i) => (
            <div key={i} style={styles.improveItem}>
              <span>{item.name}</span>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    item.level === "high" ? "#ff4d4f" : "#1890ff",
                }}
              >
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    color: "#777",
    marginBottom: "20px",
  },

  statsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  mainCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  skillHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "#eee",
    borderRadius: "10px",
  },

  progressFill: {
    height: "100%",
    background: "#1890ff",
    borderRadius: "10px",
  },

  bottomContainer: {
    display: "flex",
    gap: "15px",
  },

  tagsContainer: {
    marginTop: "10px",
  },

  tag: {
    display: "inline-block",
    padding: "5px 10px",
    margin: "5px",
    background: "#e6f7ff",
    borderRadius: "15px",
    fontSize: "12px",
  },

  improveItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginTop: "10px",
  },

  badge: {
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "10px",
    fontSize: "12px",
  },
};