import ProfileCard from "@/components/ProfileCard";
import styles from "./picker.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.mark}>
        learn.<span>amareteklay</span>.com
      </div>

      <div className={styles.page}>
        <div className={styles.headingWrap}>
          <p className={styles.eyebrow}>summer, 2026</p>
          <h1 className={styles.heading}>Whose desk is this?</h1>
        </div>

        <div className={styles.cards}>
          <ProfileCard
            href="/rodas"
            name="Rodas"
            initial="R"
            subtitle="age 15"
            accent="amber"
            stats={["Python · loops & functions", "Biology · cell structures"]}
          />
          <ProfileCard
            href="/yohana"
            name="Yohana"
            initial="Y"
            subtitle="age 13"
            accent="teal"
            stats={["Python · first variables", "Geography · flashcards"]}
          />
          <ProfileCard
            href="/sophia"
            name="Sophia"
            initial="S"
            subtitle="age 7"
            accent="rose"
            stats={["Counting practice", "Coloring corner"]}
          />
        </div>

        <p className={styles.footerLine}>
          No password needed — just <strong>pick your name</strong> to pick up
          where you left off.
        </p>
      </div>
    </>
  );
}
