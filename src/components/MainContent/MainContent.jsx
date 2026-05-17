import { useEffect, useState } from "react";
import styles from "./MainContent.module.css";
import { useNavigate } from "react-router-dom";
export default function MainContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10K+", label: "Active Users", icon: "users" },
    { number: "95%", label: "Success Rate", icon: "target" },
    { number: "500+", label: "Companies", icon: "building" },
    { number: "50+", label: "Learning Paths", icon: "book" }
  ];

  const features = [
    { 
      icon: "ai", 
      title: "AI Mentorship", 
      desc: "Smart AI-powered guidance to accelerate your growth",
      color: "#0A5ADB"
    },
    { 
      icon: "map", 
      title: "Custom Roadmaps", 
      desc: "Personalized learning paths tailored for you",
      color: "#1E40AF"
    },
    { 
      icon: "chart", 
      title: "Market Insights", 
      desc: "Real-time market analysis and trends",
      color: "#3B82F6"
    },
    { 
      icon: "community", 
      title: "Community", 
      desc: "Connect with mentors and peers worldwide",
      color: "#58A7B5"
    }
  ];

  const steps = [
    { num: "01", title: "Create Profile", desc: "Tell us your goals and aspirations", icon: "profile" },
    { num: "02", title: "Get Roadmap", desc: "AI creates your personalized path", icon: "roadmap" },
    { num: "03", title: "Start Learning", desc: "Track your progress and grow", icon: "rocket" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      text: "This platform transformed my career. The AI mentorship is incredible!",
      avatar: "👩‍💻"
    },
    {
      name: "Ahmed Hassan",
      role: "Product Manager at Meta",
      text: "The personalized roadmaps helped me land my dream job at a top tech company.",
      avatar: "👨‍💼"
    },
    {
      name: "Maria Garcia",
      role: "Data Scientist at Netflix",
      text: "Best investment in my career. The community support is amazing!",
      avatar: "👩‍🔬"
    }
  ];
const navigate = useNavigate();
  return (
    <div className={styles.main_content}>
      {/* Animated Background Elements */}
      <div className={styles.bg_elements}>
        <div className={styles.floating_circle}></div>
        <div className={styles.floating_circle_2}></div>
        <div className={styles.hero_bg}></div>
        <div className={styles.grid_pattern}></div>
      </div>

      {/* Hero Section */}
      <section className={`${styles.hero} ${isVisible ? styles.active : ""}`}>

        <div className={styles.container}>
          <div className={styles.badge_wrapper}>
            <span className={styles.badge}>
              <span className={styles.badge_icon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </span>
              AI-Powered Career Platform
            </span>
          </div>
          
<h1 className={styles.title}>
  Your Smart Mentor for{" "}
  <span className={styles.highlight}>Career </span>
  <span style={{ color: '#10B981' }}>Success</span>
</h1>
          
          <p className={styles.desc}>
            Navigate your career journey with AI-powered guidance,
            personalized learning paths, and real-time insights.
          </p>
          
          <div className={styles.buttons}>
          <button 
            className={styles.btn_primary}
            onClick={() => navigate('/login')}
          >
            <span>Start Your Journey</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          </div>
          
          <div className={styles.tags}>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Free to start
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              No credit card
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              10K+ users
            </span>
          </div>

          {/* Hero Visual */}
          <div className={styles.hero_visual}>
            <div className={styles.floating_card}>
              <div className={styles.card_header}>
                <div className={styles.card_dot}></div>
                <div className={styles.card_dot}></div>
                <div className={styles.card_dot}></div>
              </div>
              <div className={styles.card_content}>
                <div className={styles.progress_bar}>
                  <div className={styles.progress_fill}></div>
                </div>
                <p className={styles.card_text}>AI Analysis Complete</p>
                <div className={styles.card_stats}>
                  <span>95% Match</span>
                  <span>🚀</span>
                </div>
              </div>
            </div>
            <div className={styles.floating_card_2}>
              <span>🎯</span>
              <p>Career Goal Set</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.stats_grid}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={styles.stat_card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.stat_icon_wrapper}>
                  <StatIcon type={stat.icon} />
                </div>
                <div className={styles.stat_info}>
                  <span className={styles.stat_number}>{stat.number}</span>
                  <span className={styles.stat_label}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.section_header}>
            <span className={styles.section_badge}>Why Choose Us</span>
            <h2 className={styles.section_title}>
              Everything You Need to   <span className={styles.highlightt} style={{ color: '#10B981' }}>Succeed</span>
            </h2>
            <p className={styles.section_desc}>
              Powerful features designed to accelerate your career growth
            </p>
          </div>
          <div className={styles.features_grid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${styles.feature_card} ${activeFeature === index ? styles.active : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{ '--feature-color': feature.color }}
              >
                <div className={styles.feature_glow}></div>
                <div className={styles.feature_icon_wrapper}>
                  <FeatureIcon type={feature.icon} />
                </div>
                <h3 className={styles.feature_title}>{feature.title}</h3>
                <p className={styles.feature_desc}>{feature.desc}</p>
                <div className={styles.feature_arrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.how}>
        <div className={styles.container}>
          <div className={styles.section_header}>
            <span className={styles.section_badge}>How It Works</span>
            <h2 className={styles.section_title}>
              Three Steps to <span className={styles.highlight}>Transform</span>
            </h2>
          </div>
          <div className={styles.steps_container}>
            <div className={styles.steps_line}></div>
            <div className={styles.steps_grid}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step_card}>
                  <div className={styles.step_num}>{step.num}</div>
                  <div className={styles.step_icon_wrapper}>
                    <StepIcon type={step.icon} />
                  </div>
                  <h3 className={styles.step_title}>{step.title}</h3>
                  <p className={styles.step_desc}>{step.desc}</p>
                  {index < steps.length - 1 && (
                    <div className={styles.step_connector}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.section_header}>
            <span className={styles.section_badge}>Testimonials</span>
            <h2 className={styles.section_title}>
              Loved by <span className={styles.highlight}>Thousands</span>
            </h2>
          </div>
          <div className={styles.testimonials_grid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonial_card}>
                <div className={styles.testimonial_quote}>"</div>
                <p className={styles.testimonial_text}>{testimonial.text}</p>
                <div className={styles.testimonial_author}>
                  <span className={styles.testimonial_avatar}>{testimonial.avatar}</span>
                  <div className={styles.testimonial_info}>
                    <span className={styles.testimonial_name}>{testimonial.name}</span>
                    <span className={styles.testimonial_role}>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.cta_bg}></div>
        <div className={styles.cta_particles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className={styles.container}>
          <div className={styles.cta_content}>
            <h2 className={styles.cta_title}>Ready to Start?</h2>
            <p className={styles.cta_desc}>Join thousands who transformed their careers</p>
            <div className={styles.cta_buttons}>
              <button className={styles.cta_btn}
              onClick={() => navigate('/login')}>
                Get Started Free
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Icon Components
function StatIcon({ type }) {
  const icons = {
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    building: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
        <path d="M9 22v-4h6v4"/>
        <path d="M8 6h.01"/>
        <path d="M16 6h.01"/>
        <path d="M12 6h.01"/>
        <path d="M12 10h.01"/>
        <path d="M12 14h.01"/>
        <path d="M16 10h.01"/>
        <path d="M16 14h.01"/>
        <path d="M8 10h.01"/>
        <path d="M8 14h.01"/>
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <path d="M8 7h6"/>
        <path d="M8 11h8"/>
      </svg>
    )
  };
  return icons[type] || null;
}

function FeatureIcon({ type }) {
  const icons = {
    ai: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        <circle cx="7.5" cy="14.5" r="1.5"/>
        <circle cx="16.5" cy="14.5" r="1.5"/>
      </svg>
    ),
    map: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    community: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/>
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <circle cx="12" cy="10" r="2"/>
        <path d="M8 2v2"/>
        <path d="M16 2v2"/>
      </svg>
    )
  };
  return icons[type] || null;
}

function StepIcon({ type }) {
  const icons = {
    profile: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    roadmap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        <path d="M6 8h2"/>
        <path d="M6 12h2"/>
        <path d="M6 16h2"/>
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    )
  };
  return icons[type] || null;
}