import Link from "next/link";
import styles from "@/app/picker.module.css";

type ProfileCardProps = {
  href: string;
  name: string;
  initial: string;
  note: string;
  accent?: "amber" | "teal" | "rose";
};

export default function ProfileCard({
  href,
  name,
  initial,
  note,
  accent = "amber",
}: ProfileCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Continue as ${name}`}
      className={`${styles.card} ${accent !== "amber" ? styles[accent] : ""}`}
    >
      <span className={styles.tab}>
        <span>{initial}</span>
      </span>
      <div className={styles.cardBody}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardNote}>{note}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.continueLabel}>continue</span>
        <span className={styles.arrow}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
