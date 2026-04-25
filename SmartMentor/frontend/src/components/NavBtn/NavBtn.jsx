import styles from "./NavBtn.module.css";

export default function NavBtn({ 
  name, 
  variant = "primary",
  fullWidth = false,
  isScrolled = false
}) {
  return (
    <button 
      className={`${styles.nav_btn} ${styles[variant]} ${fullWidth ? styles.full_width : ""} ${isScrolled ? styles.scrolled : ""}`}
    >
      <span className={styles.btn_content}>
        {name}
        {variant === "primary" && <span className={styles.btn_arrow}>→</span>}
      </span>
      {variant === "primary" && <span className={styles.btn_glow}></span>}
    </button>
  );
}