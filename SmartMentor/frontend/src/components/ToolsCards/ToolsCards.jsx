import { useEffect, useRef, useState } from "react";
import Lamp from "../../assets/Lamp_light@3x.png";
import Target from "../../assets/targetBlue.png";
import Trends from "../../assets/trends.png";
import Users from "../../assets/usersBlue.png";
import ToolCard from "../ToolCard/ToolCard";
import styles from "./ToolsCards.module.css";

export default function ToolsCards() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tools = [
    {
      id: 1,
      img: Lamp,
      title: "AI-Powered Mentorship",
      body: "Get personalized career guidance from our advanced AI mentor",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      iconBg: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
      delay: 0,
    },
    {
      id: 2,
      img: Target,
      title: "Custom Learning Paths",
      body: "Tailored roadmaps based on your goals and current skills",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      iconBg: "linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))",
      delay: 0.1,
    },
    {
      id: 3,
      img: Trends,
      title: "Job Market Insights",
      body: "Stay ahead with real-time trends in Egyptian tech market",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      iconBg: "linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))",
      delay: 0.2,
    },
    {
      id: 4,
      img: Users,
      title: "Thriving Community",
      body: "Connect with peers and mentors on your journey",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      iconBg: "linear-gradient(135deg, rgba(67, 233, 123, 0.1), rgba(56, 249, 215, 0.1))",
      delay: 0.3,
    },
  ];

  return (
    <div className={styles.tools_cards_container} ref={sectionRef}>
      {/* Background decorative elements */}
      <div className={styles.bg_pattern}></div>
      <div className={styles.glow_orb_1}></div>
      <div className={styles.glow_orb_2}></div>
      
      {/* Grid container */}
      <div className={styles.cards_grid}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`${styles.card_wrapper} ${isVisible ? styles.visible : ""}`}
            style={{ transitionDelay: `${tool.delay}s` }}
          >
            <ToolCard
              img={tool.img}
              title={tool.title}
              body={tool.body}
              gradient={tool.gradient}
              iconBg={tool.iconBg}
            />
          </div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className={styles.floating_elements}>
        <div className={styles.floating_dot}></div>
        <div className={styles.floating_dot}></div>
        <div className={styles.floating_dot}></div>
        <div className={styles.floating_dot}></div>
      </div>

      {/* Stats badge */}
      <div className={styles.stats_floating_badge}>
        <div className={styles.stats_content}>
          <span className={styles.stats_number}>98%</span>
          <span className={styles.stats_text}>User Satisfaction</span>
        </div>
      </div>
    </div>
  );
}