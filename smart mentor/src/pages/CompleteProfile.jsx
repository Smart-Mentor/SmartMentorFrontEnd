import "./login.css";
import logo from "../assets/sign in logo.png";
import * as React from "react";
import {Box,Stepper,Step,StepButton,Button,} from "@mui/material";
const steps = ["", "", "", ""];
const skillsList = ["JavaScript","TypeScript","React","Java","SQL","Python","C++","Node.js","MongoDB","Git","Docker","AWS","CSS","HTML",];
export default function CompleteProfile() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [currentSkill, setCurrentSkill] = React.useState(null);

  const [file, setFile] = React.useState(null);
  const [career, setCareer] = React.useState("");
  const [interests, setInterests] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);

  // ================= NAV =================
  const handleNext = () => activeStep < 3 && setActiveStep((p) => p + 1);
  const handleBack = () => activeStep > 0 && setActiveStep((p) => p - 1);

  // ================= SKILLS =================
  const handleSelectSkill = (skill) => {
    const exists = selectedSkills.find((s) => s.name === skill);

    if (exists) {
      setSelectedSkills(selectedSkills.filter((s) => s.name !== skill));
      if (currentSkill === skill) setCurrentSkill(null);
    } else {
      setSelectedSkills([...selectedSkills, { name: skill, level: "" }]);
      setCurrentSkill(skill);
    }
  };

  const handleLevel = (level) => {
    setSelectedSkills((prev) =>
      prev.map((s) =>
        s.name === currentSkill ? { ...s, level } : s
      )
    );
  };

  // ================= FILE =================
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ================= INTERESTS =================
  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  // ================= LANG =================
  const toggleLang = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  return (
    <div className="login-page" style={{ display: "flex", flexDirection:"column", alignItems:"center"}}>
      <div className="heading-text">
        <div className="title">
          <img src={logo} alt="SmartMentor Logo" />
          <h1>SmartMentor</h1>
        </div>

        <h2 style={{ fontWeight: "bold" }}>Complete Your Profile</h2>
        <p style={{ color: "#777" }}>
          Help us personalize your learning experience
        </p>
      </div>

      {/* STEPPER */}
      <Box sx={{ width: "50%", mt: 3 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((_, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepButton />
            </Step>
          ))}
        </Stepper>

        {/* CARD */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          }}
        >

         {/* ================= STEP 1 ================= */}
{activeStep === 0 && (
  <>
    <h3 style={{ fontWeight: "bold" }}>Select Your Skills</h3>
    <p style={{ color: "#888" }}>
      Click again to remove skill
    </p>

    {/* SKILLS LIST */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "15px",
      }}
    >
      {skillsList.map((skill) => {
        const isSelected = selectedSkills.find((s) => s.name === skill);

        return (
          <button
            key={skill}
            onClick={() => handleSelectSkill(skill)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              cursor: "pointer",
              border:
                currentSkill === skill
                  ? "2px solid #2563eb"
                  : "1px solid #ccc",
              background: isSelected ? "#2563eb" : "#f3f4f6",
              color: isSelected ? "#fff" : "#000",
              transition: "0.2s",
            }}
          >
            {skill}
          </button>
        );
      })}
    </div>

    {/* LEVEL SELECTOR */}
    {currentSkill && (
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          background: "#f3f4f6",
        }}
      >
        <p>
          Level for <b>{currentSkill}</b>
        </p>

        <div
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevel(lvl)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background:
                  selectedSkills.find(
                    (s) =>
                      s.name === currentSkill && s.level === lvl
                  )
                    ? "#2563eb"
                    : "#ddd",
                color:
                  selectedSkills.find(
                    (s) =>
                      s.name === currentSkill && s.level === lvl
                  )
                    ? "#fff"
                    : "#000",
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* PROFESSIONAL SKILLS PREVIEW */}
    {selectedSkills.length > 0 && (
      <div style={{ marginTop: "25px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Your Skills
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {selectedSkills.map((skill, index) => {
            const levelColor =
              skill.level === "Beginner"
                ? "#facc15"
                : skill.level === "Intermediate"
                ? "#38bdf8"
                : skill.level === "Advanced"
                ? "#22c55e"
                : "#9ca3af";

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: "#f1f5f9",
                  border: "1px solid #ddd",
                }}
              >
                {/* NAME */}
                <span style={{ fontWeight: "500" }}>
                  {skill.name}
                </span>

                {/* LEVEL */}
                {skill.level && (
                  <span
                    style={{
                      background: levelColor,
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {skill.level}
                  </span>
                )}

                {/* WARNING لو مفيش level */}
                {!skill.level && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                    }}
                  >
                    !
                  </span>
                )}

                {/* REMOVE */}
                <span
                  onClick={() => {
                    setSelectedSkills((prev) =>
                      prev.filter((s) => s.name !== skill.name)
                    );

                    if (currentSkill === skill.name) {
                      setCurrentSkill(null);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#ef4444",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  ✕
                </span>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </>
)}
          {/* ================= STEP 2 ================= */}
          {activeStep === 1 && (
            <>
              <h3 style={{ fontWeight: "bold" }}>Upload Your CV</h3>

              <label style={{
                border: "2px dashed #ccc",
                padding: "30px",
                textAlign: "center",
                display: "block",
                marginTop: "20px",
                cursor: "pointer",
                borderRadius: "10px",
              }}>
                <input type="file" hidden onChange={handleFileChange} />
                <p style={{ fontSize: "30px" }}>⬆️</p>
                <p>Click to upload</p>
              </label>

              {file && <p>Uploaded: {file.name}</p>}
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {activeStep === 2 && (
            <>
              <h3 style={{ fontWeight: "bold" }}>Choose Career Path</h3>

              <select
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                style={{ width: "100%", padding: "12px", marginTop: "20px", borderRadius: "8px" }}
              >
                <option value="">Select your career</option>
                <option>Backend Developer</option>
                <option>Frontend Developer</option>
                <option>Full Stack Developer</option>
                <option>Mobile Developer</option>
                <option>AI/ML Engineer</option>
                <option>Data Scientist</option>
                <option>DevOps Engineer</option>
                <option>CyberSecurity</option>
                <option>UI/UX Designer</option>
              </select>
            </>
          )}

          {/* ================= STEP 4 ================= */}
          {activeStep === 3 && (
            <>
              <h3 style={{ fontWeight: "bold" }}>Interests & Languages</h3>

              {/* INTERESTS */}
              <div style={{ marginTop: "15px" }}>
                {["Web Dev","Mobile","AI","Data","Cyber"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleInterest(item)}
                    style={{
                      margin: "5px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      background: interests.includes(item) ? "#2563eb" : "#eee",
                      color: interests.includes(item) ? "#fff" : "#000",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* LANGUAGES */}
              <div style={{ marginTop: "25px", textAlign: "left" }}>
                <b>Languages</b>

                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Arabic", "English", "French", "German"].map((lang) => (
                    <label key={lang}>
                      <input
                        type="checkbox"
                        checked={languages.includes(lang)}
                        onChange={() => toggleLang(lang)}
                        style={{ marginRight: "8px" }}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* BUTTONS */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} variant="outlined">
                Previous
              </Button>
            )}

            <Button
              onClick={handleNext}
              variant="contained"
              sx={{ ml: "auto" }} 
            >
              {activeStep === 3 ? "Complete Setup" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}