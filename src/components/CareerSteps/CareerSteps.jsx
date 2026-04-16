import CareerCards from "../CareerCards/CareerCards";
import { useEffect, useRef, useState } from "react";
import styles from "./CareerSteps.module.css";

export default function CareerSteps() {
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

  const steps = [
    {
      num: "01",
      title: "Create Your Profile",
      body: "Tell us about your skills and career aspirations",
      icon: "👤",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      delay: 0,
    },
    {
      num: "02",
      title: "Get Your Roadmap",
      body: "Receive a personalized learning path powered by AI",
      icon: "🗺️",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      delay: 0.2,
    },
    {
      num: "03",
      title: "Start Learning",
      body: "Follow your path, track progress, and achieve your goals",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      delay: 0.4,
    },
  ];

  return (
    <div className={styles.career_steps_container} ref={sectionRef}>
      {/* Background decorative elements */}
      <div className={styles.bg_elements}>
        <div className={styles.bg_circle_1}></div>
        <div className={styles.bg_circle_2}></div>
        <div className={styles.bg_circle_3}></div>
      </div>

      {/* Connecting line between steps */}
      <div className={styles.connecting_line}></div>

      {/* Steps grid */}
      <div className={styles.steps_grid}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.step_wrapper} ${isVisible ? styles.visible : ""}`}
            style={{ transitionDelay: `${step.delay}s` }}
          >
            <CareerCards
              num={step.num}
              title={step.title}
              body={step.body}
              icon={step.icon}
              gradient={step.gradient}
            />
          </div>
        ))}
      </div>

      {/* Decorative arrows between steps for desktop */}
      <div className={styles.arrows}>
        <div className={styles.arrow}>→</div>
        <div className={styles.arrow}>→</div>
      </div>

      {/* Floating particles */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>
    </div>
  );
}