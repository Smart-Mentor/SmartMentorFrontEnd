import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RoadmapAI.module.css";
import SendBtn from "../../assets/send.png";

const MessageWithLinks = ({ text }) => {
  if (!text || typeof text !== 'string') {
    return <>{text || ''}</>;
  }

  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.substring(lastIndex, match.index);
      parts.push({ type: 'text', content: textPart });
    }
    parts.push({ type: 'link', content: match[0], url: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  if (parts.length === 0) {
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  }
  
  return (
    <div>
      {parts.map((part, idx) => {
        if (part.type === 'link') {
          return (
            <a key={idx} href={part.url} target="_blank" rel="noopener noreferrer" className={styles.message_link}>
              {part.content}
            </a>
          );
        }
        return <span key={idx} dangerouslySetInnerHTML={{ __html: part.content.replace(/\n/g, '<br/>') }} />;
      })}
    </div>
  );
};

// Component to display roadmap from API response
const RoadmapDisplay = ({ roadmap, career, knownSkills, marketInfo }) => {
  console.log("RoadmapDisplay received:", { roadmap, career, knownSkills, marketInfo });
  
  // Handle the roadmap array
  let roadmapSkills = [];
  
  if (Array.isArray(roadmap)) {
    roadmapSkills = roadmap;
  } else if (roadmap && Array.isArray(roadmap.roadmap)) {
    roadmapSkills = roadmap.roadmap;
  } else if (roadmap && roadmap.skills && Array.isArray(roadmap.skills)) {
    roadmapSkills = roadmap.skills;
  }
  
  console.log("Extracted roadmap skills:", roadmapSkills);
  
  if (!roadmapSkills || roadmapSkills.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.roadmap_container}>
      <div className={styles.roadmap_header}>
        <h3 className={styles.roadmap_title}>
          🗺️ Your Personalized Learning Roadmap
          {career && <span className={styles.career_badge}>{career}</span>}
        </h3>
        
        {/* Career Description */}
        {marketInfo && (
          <div className={styles.market_info}>
            {marketInfo.demand && (
              <div className={styles.market_info_item}>
                <span className={styles.market_label}>📈 Demand:</span>
                <span className={styles.market_value}>{marketInfo.demand}</span>
              </div>
            )}
            {marketInfo.salary && (
              <div className={styles.market_info_item}>
                <span className={styles.market_label}>💰 Salary Range:</span>
                <span className={styles.market_value}>{marketInfo.salary}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Known Skills Section */}
      {knownSkills && knownSkills.length > 0 && (
        <div className={styles.known_skills_section}>
          <h4>🎯 Your Skills</h4>
          <div className={styles.skills_tags}>
            {knownSkills.map((skill, index) => (
              <span key={index} className={styles.skill_tag_known}>
                {typeof skill === 'object' ? skill.name : skill}
              </span>
            ))}
          </div>
          <p className={styles.skill_note}>✨ Building upon your existing knowledge...</p>
        </div>
      )}
      
      {/* Learning Roadmap Timeline */}
      <div className={styles.timeline}>
        {roadmapSkills.map((skill, index) => (
          <div key={index} className={styles.timeline_item}>
            <div className={styles.timeline_marker}>
              <span className={styles.step_number}>{skill.order || index + 1}</span>
              <div className={styles.timeline_line}></div>
            </div>
            <div className={styles.timeline_content}>
              <div className={styles.step_header}>
                <h4 className={styles.step_title}>
                  {skill.skill || "Learning Module"}
                  {skill.level && (
                    <span className={`${styles.level_badge} ${styles[skill.level]}`}>
                      {skill.level}
                    </span>
                  )}
                  {skill.importance === 1 && (
                    <span className={styles.importance_badge}>⭐ Critical</span>
                  )}
                </h4>
                {skill.duration_weeks && (
                  <div className={styles.duration_badge}>
                    ⏱️ {skill.duration_weeks} week{skill.duration_weeks !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <p className={styles.step_description}>
                {skill.ai_explanation || `Learn ${skill.skill} to build expertise as a ${career || 'developer'}`}
              </p>
              
              {skill.learning_strategy && (
                <div className={styles.learning_strategy}>
                  <span className={styles.strategy_label}>📖 Learning Strategy:</span>
                  <p>{skill.learning_strategy}</p>
                </div>
              )}
              
              {skill.real_world_use && skill.real_world_use.length > 0 && (
                <div className={styles.real_world_use}>
                  <span className={styles.use_label}>💡 Real-world applications:</span>
                  <div className={styles.use_tags}>
                    {skill.real_world_use.map((use, i) => (
                      <span key={i} className={styles.use_tag}>{use}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {skill.project_ideas && skill.project_ideas.length > 0 && (
                <div className={styles.project_ideas}>
                  <span className={styles.project_label}>🚀 Project ideas:</span>
                  <ul className={styles.project_list}>
                    {skill.project_ideas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Next Steps */}
      <div className={styles.next_steps}>
        <h4>🎯 Ready to Start Learning?</h4>
        <div className={styles.resource_links}>
          <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            📚 Coursera
          </a>
          <a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            🎓 Udemy
          </a>
          <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            💻 freeCodeCamp
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            🔗 GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

// Local roadmap data for careers the API may not recognize 
const LOCAL_ROADMAPS = {
  "Full Stack Developer": {
    market_info: { demand: "Very High", salary: "$90,000 – $150,000/year" },
    roadmap: [
      { order:1,  skill:"HTML & CSS",               level:"Beginner",     duration_weeks:3, ai_explanation:"The foundation of every web page — structure and styling.", real_world_use:["Landing pages","Portfolio sites"], project_ideas:["Build a personal portfolio"] },
      { order:2,  skill:"JavaScript",                level:"Beginner",     duration_weeks:4, ai_explanation:"Adds interactivity and logic to web pages.", real_world_use:["Dynamic forms","Animations"], project_ideas:["To-do list app","Quiz game"] },
      { order:3,  skill:"Git & GitHub",              level:"Beginner",     duration_weeks:1, ai_explanation:"Version control keeps your code history safe and enables collaboration.", real_world_use:["Team projects","Open source"], project_ideas:["Push your projects to GitHub"] },
      { order:4,  skill:"React",                     level:"Intermediate", duration_weeks:4, ai_explanation:"The most popular library for building modern, component-based UIs.", real_world_use:["SPAs","Dashboards"], project_ideas:["E-commerce front-end","Blog UI"] },
      { order:5,  skill:"Node.js",                   level:"Intermediate", duration_weeks:3, ai_explanation:"Runs JavaScript on the server side — perfect for APIs and back-end logic.", real_world_use:["REST APIs","CLI tools"], project_ideas:["RESTful API for a blog"] },
      { order:6,  skill:"REST APIs",                 level:"Intermediate", duration_weeks:2, ai_explanation:"Design and consume HTTP APIs — the glue between front-end and back-end.", real_world_use:["Mobile back-ends","Third-party integrations"], project_ideas:["Weather app consuming a public API"] },
      { order:7,  skill:"SQL & Databases",           level:"Intermediate", duration_weeks:3, ai_explanation:"Store and query structured data with PostgreSQL or MySQL.", real_world_use:["User auth systems","Analytics"], project_ideas:["Inventory management system"] },
      { order:8,  skill:"Authentication & Security", level:"Intermediate", duration_weeks:2, ai_explanation:"JWT, OAuth, and password hashing keep user data safe.", real_world_use:["Login systems","OAuth with Google/GitHub"], project_ideas:["Secure user auth module"] },
      { order:9,  skill:"TypeScript",                level:"Intermediate", duration_weeks:2, ai_explanation:"Typed JavaScript catches bugs early and improves maintainability.", real_world_use:["Large React apps","Enterprise back-ends"], project_ideas:["Refactor a JS project to TS"] },
      { order:10, skill:"Docker & Containers",       level:"Advanced",     duration_weeks:2, ai_explanation:"Package apps with their dependencies for consistent environments.", real_world_use:["Microservices","Dev/prod parity"], project_ideas:["Dockerize your Node+React app"] },
      { order:11, skill:"CI/CD Pipelines",           level:"Advanced",     duration_weeks:2, ai_explanation:"Automate testing and deployment with GitHub Actions or similar tools.", real_world_use:["Auto-deploy on push","Automated tests"], project_ideas:["GitHub Actions pipeline for your project"] },
      { order:12, skill:"Cloud Deployment (AWS/GCP)",level:"Advanced",     duration_weeks:3, ai_explanation:"Deploy and scale apps on cloud platforms.", real_world_use:["Hosted SaaS products","Scalable APIs"], project_ideas:["Deploy full-stack app on AWS EC2 + RDS"] },
      { order:13, skill:"System Design",             level:"Advanced",     duration_weeks:3, ai_explanation:"Architect scalable, fault-tolerant systems for millions of users.", real_world_use:["Technical interviews","Large-scale products"], project_ideas:["Design a URL shortener or Twitter clone"] },
      { order:14, skill:"Capstone Projects",         level:"Advanced",     duration_weeks:4, ai_explanation:"Tie everything together in production-quality projects for your portfolio.", real_world_use:["Job interviews","Freelance work"], project_ideas:["Full-stack SaaS with auth, DB, and CI/CD"] },
    ]
  },
  "Cloud Architect": {
    market_info: { demand: "High", salary: "$120,000 – $180,000/year" },
    roadmap: [
      { order:1,  skill:"Linux & Networking Basics",              level:"Beginner",     duration_weeks:3, ai_explanation:"Understand OS fundamentals and how packets travel across networks.", real_world_use:["Server administration","Troubleshooting"], project_ideas:["Set up a Linux VM and configure networking"] },
      { order:2,  skill:"Python or Bash Scripting",              level:"Beginner",     duration_weeks:3, ai_explanation:"Automate repetitive cloud tasks and infrastructure operations.", real_world_use:["Automation scripts","Lambda functions"], project_ideas:["Write a Bash script to back up files to S3"] },
      { order:3,  skill:"Cloud Fundamentals (AWS/Azure/GCP)",    level:"Beginner",     duration_weeks:3, ai_explanation:"Core services: compute, storage, databases, and identity.", real_world_use:["Hosting apps","Object storage"], project_ideas:["Host a static website on S3 + CloudFront"] },
      { order:4,  skill:"IAM & Security",                        level:"Intermediate", duration_weeks:2, ai_explanation:"Control who can do what with roles, policies, and least-privilege principles.", real_world_use:["Multi-account setups","Compliance"], project_ideas:["Create an IAM policy restricting S3 access"] },
      { order:5,  skill:"Compute & Storage Services",            level:"Intermediate", duration_weeks:3, ai_explanation:"EC2, Lambda, S3, EBS — the building blocks of every cloud app.", real_world_use:["Scalable back-ends","Data lakes"], project_ideas:["Deploy an auto-scaling web app on EC2"] },
      { order:6,  skill:"Networking (VPC, DNS, Load Balancing)", level:"Intermediate", duration_weeks:3, ai_explanation:"Isolate resources, route traffic, and ensure high availability.", real_world_use:["Multi-tier architectures","Global apps"], project_ideas:["Build a 3-tier VPC with public/private subnets"] },
      { order:7,  skill:"Infrastructure as Code (Terraform)",    level:"Intermediate", duration_weeks:3, ai_explanation:"Provision cloud resources with code for repeatability and version control.", real_world_use:["Consistent environments","Team collaboration"], project_ideas:["Provision an entire VPC with Terraform"] },
      { order:8,  skill:"Containers & Kubernetes",               level:"Intermediate", duration_weeks:4, ai_explanation:"Package and orchestrate workloads for portability and scale.", real_world_use:["Microservices","EKS/GKE clusters"], project_ideas:["Deploy a multi-service app on Kubernetes"] },
      { order:9,  skill:"Serverless Architecture",               level:"Advanced",     duration_weeks:2, ai_explanation:"Build event-driven apps that scale automatically with zero server management.", real_world_use:["API back-ends","Event processing"], project_ideas:["Build a serverless REST API with Lambda + API Gateway"] },
      { order:10, skill:"Cost Optimization",                     level:"Advanced",     duration_weeks:2, ai_explanation:"Identify waste and right-size resources to reduce cloud spend.", real_world_use:["FinOps","Budget planning"], project_ideas:["Audit an AWS account with Cost Explorer"] },
      { order:11, skill:"High Availability & Disaster Recovery", level:"Advanced",     duration_weeks:3, ai_explanation:"Design systems that stay up during failures and recover quickly.", real_world_use:["SLA-bound products","Banking systems"], project_ideas:["Set up cross-region S3 replication + RDS failover"] },
      { order:12, skill:"Multi-Cloud Strategy",                  level:"Advanced",     duration_weeks:3, ai_explanation:"Avoid vendor lock-in and leverage the best services across providers.", real_world_use:["Enterprise architecture","Regulated industries"], project_ideas:["Deploy the same app on AWS and GCP with Terraform"] },
      { order:13, skill:"Cloud Certifications (AWS SAA)",        level:"Advanced",     duration_weeks:4, ai_explanation:"Validate your expertise and stand out in the job market.", real_world_use:["Job applications","Client trust"], project_ideas:["Pass the AWS Solutions Architect Associate exam"] },
      { order:14, skill:"Capstone Projects",                     level:"Advanced",     duration_weeks:4, ai_explanation:"Architect a real-world cloud solution end-to-end.", real_world_use:["Portfolio","Freelance consulting"], project_ideas:["Design and deploy a fault-tolerant 3-tier app with IaC, CI/CD, and monitoring"] },
    ]
  },
  "Security Specialist": {
    market_info: { demand: "Very High", salary: "$95,000 – $160,000/year" },
    roadmap: [
      { order:1,  skill:"Networking Fundamentals",          level:"Beginner",     duration_weeks:3, ai_explanation:"TCP/IP, DNS, HTTP — understanding traffic is the first step to securing it.", real_world_use:["Network analysis","Firewall rules"], project_ideas:["Capture and analyze packets with Wireshark"] },
      { order:2,  skill:"Operating Systems (Linux & Windows)",level:"Beginner",   duration_weeks:3, ai_explanation:"Most attacks target OS internals — knowing them is essential for defense.", real_world_use:["Server hardening","Log analysis"], project_ideas:["Harden a Linux server following CIS benchmarks"] },
      { order:3,  skill:"Python or Bash for Security",      level:"Beginner",     duration_weeks:3, ai_explanation:"Automate scans, parse logs, and write custom security tools.", real_world_use:["Recon scripts","Log parsers"], project_ideas:["Write a port scanner in Python"] },
      { order:4,  skill:"Cryptography Basics",              level:"Beginner",     duration_weeks:2, ai_explanation:"Symmetric/asymmetric encryption, hashing, and PKI protect data in transit and at rest.", real_world_use:["TLS/HTTPS","Secure storage"], project_ideas:["Implement AES encryption and compare hash algorithms"] },
      { order:5,  skill:"Threat Modeling",                  level:"Intermediate", duration_weeks:2, ai_explanation:"Identify threats before attackers do using STRIDE and attack trees.", real_world_use:["Secure SDLC","Architecture reviews"], project_ideas:["Create a STRIDE threat model for a sample app"] },
      { order:6,  skill:"Vulnerability Assessment",         level:"Intermediate", duration_weeks:3, ai_explanation:"Use Nmap, Nessus, and OpenVAS to find weaknesses before attackers do.", real_world_use:["Compliance audits","Bug bounty"], project_ideas:["Scan a test VM and generate a vulnerability report"] },
      { order:7,  skill:"Penetration Testing",              level:"Intermediate", duration_weeks:4, ai_explanation:"Ethically exploit vulnerabilities to prove risk and recommend fixes.", real_world_use:["Red teaming","Client assessments"], project_ideas:["Pwn a HackTheBox machine and write a full report"] },
      { order:8,  skill:"SIEM & Log Analysis",              level:"Intermediate", duration_weeks:3, ai_explanation:"Collect and correlate logs to detect attacks in real time with Splunk or ELK.", real_world_use:["SOC operations","Compliance"], project_ideas:["Set up an ELK stack and detect a brute-force attack"] },
      { order:9,  skill:"Incident Response",                level:"Intermediate", duration_weeks:3, ai_explanation:"Contain, eradicate, and recover from security incidents systematically.", real_world_use:["SOC teams","Crisis management"], project_ideas:["Run a tabletop ransomware incident response exercise"] },
      { order:10, skill:"Cloud Security",                   level:"Advanced",     duration_weeks:3, ai_explanation:"Secure cloud environments with IAM, encryption, and config management.", real_world_use:["AWS/Azure security reviews","CSPM tools"], project_ideas:["Audit an AWS account with Scout Suite"] },
      { order:11, skill:"Application Security (OWASP)",     level:"Advanced",     duration_weeks:3, ai_explanation:"Defend against the OWASP Top 10 and integrate security into the SDLC.", real_world_use:["Secure code review","DevSecOps"], project_ideas:["Find and fix the OWASP Top 10 in a vulnerable app (DVWA)"] },
      { order:12, skill:"Malware Analysis & Forensics",     level:"Advanced",     duration_weeks:4, ai_explanation:"Reverse-engineer malware and collect digital evidence post-breach.", real_world_use:["Threat intelligence","Legal investigations"], project_ideas:["Analyze a malware sample in a sandboxed VM"] },
      { order:13, skill:"Security Architecture & Compliance",level:"Advanced",    duration_weeks:3, ai_explanation:"Design secure systems and navigate frameworks like ISO 27001, SOC 2, and NIST.", real_world_use:["Enterprise security","Audits"], project_ideas:["Create a security architecture for a fintech startup"] },
      { order:14, skill:"Projects & CTF Challenges",        level:"Advanced",     duration_weeks:4, ai_explanation:"Build a portfolio of real-world security work to land your first role.", real_world_use:["Job applications","Bug bounty programs"], project_ideas:["Complete 10 TryHackMe rooms and publish write-ups"] },
    ]
  }
};

// Normalize career name from message text to a known key
const normalizeCareer = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("full stack")) return "Full Stack Developer";
  if (lower.includes("cloud architect")) return "Cloud Architect";
  if (lower.includes("security specialist")) return "Security Specialist";
  return null;
};

export default function RoadmapAI() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForSkills, setWaitingForSkills] = useState(false);
  const chatEndRef = useRef(null);

  const API_BASE_URL = "https://fathymohamed-roadmapai.hf.space";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("roadmap_" + Date.now());
    }
  }, [sessionId]);

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || !sessionId || isLoading) return;

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      const requestPayload = {
        message: msgToSend,
        session_id: sessionId,
        model_type: "roadmap"
      };
      
      console.log("📤 Sending roadmap request:", requestPayload);

      const res = await axios.post(`${API_BASE_URL}/chat`, requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000
      });
      
      const data = res.data;
      console.log("📥 Full response received:", JSON.stringify(data, null, 2));
      
      // Extract the bot message text
      let botMessageText = data.reply || "Here's your personalized learning roadmap!";
      
      // Extract career name
      let careerName = data.career || "";
      
      // Extract known skills (top level)
      let knownSkillsArray = data.known_skills || [];
      
      // Extract market info from nested roadmap object
      let marketInfoObj = null;
      if (data.roadmap && data.roadmap.market_info) {
        marketInfoObj = data.roadmap.market_info;
      }
      
      // Extract roadmap array 
      let roadmapArray = null;
      if (data.roadmap && data.roadmap.roadmap && Array.isArray(data.roadmap.roadmap)) {
        roadmapArray = data.roadmap.roadmap;
        console.log("Found roadmap array with", roadmapArray.length, "items");
      } else if (data.roadmap && Array.isArray(data.roadmap)) {
        roadmapArray = data.roadmap;
      } else if (Array.isArray(data.roadmap)) {
        roadmapArray = data.roadmap;
      }
      
      if (!roadmapArray || roadmapArray.length === 0) {
        const detectedCareer = normalizeCareer(msgToSend) || normalizeCareer(careerName);
        if (detectedCareer && LOCAL_ROADMAPS[detectedCareer]) {
          const local = LOCAL_ROADMAPS[detectedCareer];
          roadmapArray  = local.roadmap;
          marketInfoObj = local.market_info;
          careerName    = detectedCareer;
          botMessageText = `Here's your personalized learning roadmap for **${detectedCareer}**! 🚀\n\nThis roadmap will take you from the fundamentals all the way to advanced skills, with real-world projects along the way.`;
        }
      }

      // Check if the response is asking for skills
      const isAskingForSkills = botMessageText.toLowerCase().includes("what skills") || 
                                botMessageText.toLowerCase().includes("do you already have") ||
                                botMessageText.toLowerCase().includes("tell me about your") ||
                                botMessageText.toLowerCase().includes("current skills");
      
      // Create bot message with all the extracted data
      let botMsg = { 
        sender: "bot", 
        text: botMessageText,
        timestamp: new Date(),
        careerName: careerName,
        knownSkills: knownSkillsArray,
        marketInfo: marketInfoObj,
        roadmapData: roadmapArray,
        isAskingForSkills: isAskingForSkills
      };
      
      console.log("Bot message created:", { 
        careerName, 
        knownSkills: knownSkillsArray, 
        roadmapLength: roadmapArray?.length,
        marketInfo: marketInfoObj,
        isAskingForSkills
      });
      
      setChat((prev) => [...prev, botMsg]);
      
      if (isAskingForSkills && (!roadmapArray || roadmapArray.length === 0)) {
        setWaitingForSkills(true);
      } else {
        setWaitingForSkills(false);
      }

      if (data.session_id && data.session_id !== sessionId) {
        console.log("🔄 Updating session ID:", data.session_id);
        setSessionId(data.session_id);
      }
      
    } catch (err) {
      console.error("❌ API Error:", err);
      
      let errorMessage = "❌ Error connecting to the server.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "❌ Request timeout. Please try again.";
      } else if (err.response) {
        console.error("Response data:", err.response.data);
        errorMessage = `❌ Server error: ${err.response.status}. Please try again later.`;
        
        if (err.response.status === 422) {
          errorMessage = "❌ Invalid request format. Please try rephrasing your career goal.\n\nExample: 'I want to become a Data Scientist'";
        }
      } else if (err.request) {
        errorMessage = "❌ Cannot connect to the server. Please check your connection.";
      } else {
        errorMessage = `❌ Error: ${err.message}`;
      }
      
      setChat((prev) => [...prev, { 
        sender: "bot", 
        text: errorMessage, 
        timestamp: new Date() 
      }]);
      setWaitingForSkills(false);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/reset`, {
        session_id: sessionId
      });
      setChat([]);
      setSessionId("roadmap_" + Date.now());
      setWaitingForSkills(false);
      console.log("🔄 Chat reset successfully");
    } catch (err) {
      console.error("Failed to reset chat:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCareerSelect = (career) => {
    sendMessage(`I want to become a ${career}`);
  };

  const careerPaths = [
    { text: "Frontend Developer", icon: "🎨", description: "Bring designs to life and create smooth, interactive user experiences" },
    { text: "Backend Developer", icon: "⚙️", description: "Handle behind-the-scenes logic, data processing, and server operations" },
    { text: "Full Stack Developer", icon: "🌐", description: "Work across both client-side and server-side development" },
    { text: "Data Scientist", icon: "📊", description: "Turn raw data into meaningful insights to guide decisions" },
    { text: "DevOps Engineer", icon: "🔧", description: "Streamline development workflows and infrastructure management" },
    { text: "AI/ML Engineer", icon: "🤖", description: "Create systems that learn and adapt from experience" },
    { text: "Cloud Architect", icon: "☁️", description: "Plan and manage flexible, resilient cloud environments" },
    { text: "Security Specialist", icon: "🔒", description: "Identify vulnerabilities and defend against digital threats" },
];

  const inputPlaceholder = waitingForSkills 
    ? "Enter your current skills (e.g., HTML, CSS, JavaScript)..." 
    : "Enter your career goal (e.g., I want to become a Data Scientist)...";

  return (
    <div className={styles.container}>
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.bg_circle_3}></div>
      <div className={styles.floating_paths}>
        <span>🗺️</span>
        <span>📍</span>
        <span>🧭</span>
        <span>✨</span>
        <span>🎯</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <button className={styles.back_btn} onClick={() => navigate('/aimentor')}>
            ← Back to Models
          </button>
          <div className={styles.header_info}>
            <div className={styles.header_icon}>
              <span>🗺️</span>
              <div className={styles.icon_ring}></div>
            </div>
            <div>
              <h1>Path Weaver</h1>
              <p>Create your personalized learning roadmap to career success</p>
            </div>
          </div>
          <button className={styles.reset_btn} onClick={handleReset} disabled={isLoading}>
            🔄 New Chat
          </button>
        </div>

        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}>🧭</div>
                  <h2>Your Learning Journey Starts Here</h2>
                  <p>Tell me your career goal, and I'll create a step-by-step roadmap for you!</p>
                  
                  <div className={styles.topic_grid}>
                    {careerPaths.slice(0, 4).map((path, idx) => (
                      <button 
                        key={idx} 
                        className={styles.topic_card}
                        onClick={() => handleCareerSelect(path.text)}
                        disabled={isLoading}
                      >
                        <span className={styles.topic_icon}>{path.icon}</span>
                        <span>{path.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.topic_grid_secondary}>
                    {careerPaths.slice(4, 8).map((path, idx) => (
                      <button 
                        key={idx} 
                        className={styles.topic_card_secondary}
                        onClick={() => handleCareerSelect(path.text)}
                        disabled={isLoading}
                      >
                        <span className={styles.topic_icon}>{path.icon}</span>
                        <span>{path.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.featured_topics}>
                    <div className={styles.topic_tags}>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chat.map((msg, i) => (
                  <div key={i} className={`${styles.message} ${msg.sender === "user" ? styles.user_msg : styles.bot_msg}`}>
                    <div className={styles.message_bubble}>
                      <div className={styles.message_text}>
                        {msg.sender === "user" ? (
                          msg.text
                        ) : (
                          <>
                            <MessageWithLinks text={msg.text} />
                            {msg.roadmapData && msg.roadmapData.length > 0 && (
                              <RoadmapDisplay 
                                roadmap={msg.roadmapData}
                                career={msg.careerName}
                                knownSkills={msg.knownSkills}
                                marketInfo={msg.marketInfo}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div className={styles.message_time}>
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className={`${styles.message} ${styles.bot_msg}`}>
                    <div className={styles.message_bubble}>
                      <div className={styles.typing_indicator}>
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.input_field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={inputPlaceholder}
                rows={1}
                disabled={isLoading}
              />
              <button 
                className={styles.send_btn} 
                onClick={() => sendMessage()} 
                disabled={!message.trim() || isLoading}
              >
                <img src={SendBtn} alt="Send" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}