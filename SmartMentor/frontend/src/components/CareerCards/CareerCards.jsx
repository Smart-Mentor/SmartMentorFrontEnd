import styles from "./CareerCards.module.css";

export default function CareerCards({ num, title, body, icon, gradient }) {
  return (
    <div className={styles.career_card}>
      <div className={styles.card_inner}>
        {/* Number badge */}
        <div className={styles.number_badge} style={{ background: gradient }}>
          <span className={styles.number}>{num}</span>
        </div>

        {/* Icon */}
        {icon && (
          <div className={styles.icon_wrapper}>
            <span className={styles.icon}>{icon}</span>
          </div>
        )}

        {/* Content */}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>

        {/* Decorative line */}
        <div className={styles.decorative_line} style={{ background: gradient }}></div>

        {/* Hover effect overlay */}
        <div className={styles.hover_overlay}></div>
      </div>
    </div>
  );
}