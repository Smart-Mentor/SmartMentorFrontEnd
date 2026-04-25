import styles from "./ToolCard.module.css";

export default function ToolCard({ img, title, body, gradient, iconBg }) {
  return (
    <div className={styles.tool_card}>
      <div className={styles.card_glow} style={{ background: gradient }}></div>
      
      <div className={styles.card_content}>
        {/* Icon container */}
        <div className={styles.icon_container} style={{ background: iconBg }}>
          <div className={styles.icon_wrapper}>
            <img src={img} alt={title} className={styles.icon} />
          </div>
          <div className={styles.icon_pulse} style={{ background: gradient }}></div>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Body */}
        <p className={styles.body}>{body}</p>

        {/* Learn more link */}
        <div className={styles.learn_more}>
          <span className={styles.learn_more_text}>Learn more</span>
          <svg className={styles.arrow_icon} viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Decorative border */}
        <div className={styles.card_border}></div>
      </div>
    </div>
  );
}