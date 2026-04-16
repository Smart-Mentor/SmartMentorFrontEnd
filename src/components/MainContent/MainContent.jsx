import { useEffect, useRef, useState } from "react";
import ContentBtns from "../ContentBtns/ContentBtns";
import ContentCheck from "../ContentCheck/ContentCheck";
import CareerSteps from "../CareerSteps/CareerSteps";
import ToolsCards from "../ToolsCards/ToolsCards";
import styles from "./MainContent.module.css";

export default function MainContent() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.main_content}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      
      {/* Hero Section */}
      <div className={`${styles.hero_section} ${isVisible ? styles.fade_in : ""}`} ref={heroRef}>
        <div className={styles.hero_badge}>
          <span className={styles.badge_text}>✨ AI-Powered Career Platform</span>
        </div>
        
        <h1 className={styles.hero_title}>
          Your Smart Mentor for{" "}
          <span className={styles.gradient_text}>Career</span>
          <br />
          <span className={styles.success_text}>Success</span>
        </h1>
        
        <p className={styles.hero_description}>
          Navigate your career journey with AI-powered guidance, personalized
          learning paths,
          <br /> and real-time job market insights tailored for Egyptian
          students and professionals.
        </p>

        <div className={styles.hero_stats}>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>10K+</div>
            <div className={styles.stat_label}>Active Users</div>
          </div>
          <div className={styles.stat_divider}></div>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>95%</div>
            <div className={styles.stat_label}>Success Rate</div>
          </div>
          <div className={styles.stat_divider}></div>
          <div className={styles.stat_item}>
            <div className={styles.stat_number}>500+</div>
            <div className={styles.stat_label}>Companies</div>
          </div>
        </div>
      </div>

      {/* Content Buttons Section */}
      <div className={styles.section_fade}>
        <ContentBtns />
      </div>

      {/* Content Check Section */}
      <div className={styles.section_fade}>
        <ContentCheck />
      </div>

      {/* How It Works Section */}
      <div className={styles.how_it_works_section}>
        <div className={styles.section_header}>
          <span className={styles.section_badge}>How It Works</span>
          <h2 className={styles.section_title}>
            Three simple steps to <span className={styles.highlight}>transform</span> your career
          </h2>
          <p className={styles.section_subtitle}>
            Our proven methodology helps you achieve your career goals faster
          </p>
        </div>
        <CareerSteps />
      </div>

      {/* Tools Section */}
      <div className={styles.tools_section}>
        <div className={styles.section_header}>
          <span className={styles.section_badge}>Tools & Resources</span>
          <h2 className={styles.section_title}>
            Everything You Need to <span className={styles.highlight}>Succeed</span>
          </h2>
          <p className={styles.section_subtitle}>
            Comprehensive tools and insights for your career growth
          </p>
        </div>
        <ToolsCards />
      </div>

      {/* CTA Section */}
      <div className={styles.cta_section}>
        <div className={styles.cta_content}>
          <h3 className={styles.cta_title}>Ready to Start Your Journey?</h3>
          <p className={styles.cta_description}>
            Join thousands of successful professionals who transformed their careers with SmartMentor
          </p>
          <button className={styles.cta_button}>
            Get Started Free
            <span className={styles.cta_arrow}>→</span>
          </button>
        </div>
        <div className={styles.cta_bg_pattern}></div>
      </div>
    </div>
  );
}