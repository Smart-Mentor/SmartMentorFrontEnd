import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./Aiagent.module.css";

import AnalyzeSkills from "../../assets/AnalyzeSkills.png";
import CareerAdvice from "../../assets/CareerAdvice.png";
import GenerateRoadmap from "../../assets/GenerateRoadmap.png";
import ReviewCV from "../../assets/ReviewCV.png";
import LampLight from "../../assets/Lamp_light2.png";

const aiModels = [
  { 
    id: "recommendation", 
    name: "Course Navigator", 
    img: AnalyzeSkills, 
    icon: "📚", 
    color: "#0A5ADB",
    gradient: "linear-gradient(135deg, rgb(22, 73, 129), rgb(50 75 118))",
    description: "Discover personalized courses tailored to your career goals",
    features: [
      "Smart course matching",
      "Skill-based recommendations",
      "Learning path optimization"
    ],
    route: "/aimentor/recommendation",
    tag: "Most Popular"
  },
  { 
    id: "roadmap", 
    name: "Path Weaver", 
    img: GenerateRoadmap, 
    icon: "🗺️", 
    color: "#58A7B5",
    gradient: "linear-gradient(135deg, rgb(74, 29, 109), rgb(40 24 69))",
    description: "Create your personalized journey to career success",
    features: [
      "Step-by-step roadmap",
      "Timeline visualization",
      "Resource curation"
    ],
    route: "/aimentor/roadmap",
    tag: "New"
  },
  { 
    id: "cv-analysis", 
    name: "Profile Optimizer", 
    img: ReviewCV, 
    icon: "⚡", 
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgb(45, 43, 107), rgb(29 29 92))",
    description: "AI-powered CV analysis and job matching",
    features: [
      "CV optimization tips",
      "Job market matching",
      "Skill gap analysis"
    ],
    route: "/aimentor/cv-analysis",
    tag: "AI Enhanced"
  }
];

export default function Aiagent() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleModelSelect = (route) => {
    navigate(route);
  };

  return (
    <Box component="main" className={styles.aiagent_container}>
      {/* Animated background elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      <div className={styles.particle_1}></div>
      <div className={styles.particle_2}></div>
      <div className={styles.particle_3}></div>
      <div className={styles.particle_4}></div>
      <div className={styles.particle_5}></div>

      <div className={styles.floating_orb}></div>
      <div className={styles.floating_orb_2}></div>

      <div className={styles.aiagent_content}>
        {/* Hero Section */}
        <div className={styles.hero_section}>
          <div className={styles.hero_badge}>
            <span className={styles.badge_pulse}></span>
            <span>✨ AI-Powered Career Assistant</span>
          </div>
          <div className={styles.hero_title_wrapper}>
            <div className={styles.hero_icon}>
              <img src={LampLight} alt="AI Mentor" />
            </div>
            <h1 className={styles.hero_title}>
              Your Intelligent<br />
              <span className={styles.gradient_text}>Career Companion</span>
            </h1>
          </div>
          <p className={styles.hero_description}>
            Experience the future of career guidance with our advanced AI models designed to help you succeed
          </p>
        </div>

        {/* Section Title */}
        <div className={styles.section_title_container}>
          <div className={styles.section_title_line}></div>
          <h2 className={styles.section_title}>Choose Your AI Assistant</h2>
          <div className={styles.section_title_line}></div>
        </div>

        {/* AI Models Grid */}
        <div className={styles.models_grid}>
          {aiModels.map((model, index) => (
            <div
              key={model.id}
              className={`${styles.model_card} ${hoveredCard === index ? styles.hovered : ""}`}
              onClick={() => handleModelSelect(model.route)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.card_glow} style={{ background: model.gradient }}></div>
              
              <div className={styles.card_badge} style={{ background: model.gradient }}>
                {model.tag}
              </div>
              
              <div className={styles.card_icon_wrapper}>
                <div className={styles.icon_background} style={{ background: `${model.color}15` }}>
                  <span className={styles.card_icon}>{model.icon}</span>
                </div>
              </div>
              
              <h3 className={styles.card_title}>{model.name}</h3>
              <p className={styles.card_description}>{model.description}</p>
              
              <div className={styles.card_features}>
                {model.features.map((feature, idx) => (
                  <div key={idx} className={styles.feature_item}>
                    <svg className={styles.feature_check} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={styles.card_button} style={{ background: model.gradient }}>
                <span>Launch Assistant</span>
                <svg className={styles.button_arrow} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Features Section - No Stats, No Feedback */}
        <div className={styles.features_section}>
          <div className={styles.feature_card}>
            <div className={styles.feature_icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <h4>Real-time AI Processing</h4>
            <p>Get instant responses powered by advanced language models</p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.feature_icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h4>Secure & Private</h4>
            <p>Your data is encrypted and never shared with third parties</p>
          </div>
          <div className={styles.feature_card}>
            <div className={styles.feature_icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4>24/7 Availability</h4>
            <p>Access your AI mentor anytime, anywhere, on any device</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.cta_section}>
          <div className={styles.cta_content}>
            <h3>Ready to Accelerate Your Career?</h3>
            <p>Join thousands of successful professionals who achieved their goals with SmartMentor</p>
            <button className={styles.cta_button} onClick={() => handleModelSelect("/aimentor/recommendation")}>
              Get Started Now
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}