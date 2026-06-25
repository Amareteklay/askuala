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
          <h1 className={styles.heading}>Pick your name, and let&apos;s begin.</h1>
          <span className={styles.headingUnderline} />
        </div>

        <div className={styles.cards}>
          <ProfileCard
            href="/rodas"
            name="Rodas"
            initial="R"
            accent="amber"
            note="Pick up where you left off."
          />
          <ProfileCard
            href="/yohana"
            name="Yohana"
            initial="Y"
            accent="teal"
            note="Pick up where you left off."
          />
          <ProfileCard
            href="/sophia"
            name="Sophia"
            initial="S"
            accent="rose"
            note="Time to play!"
          />
        </div>

        <p className={styles.footerLine}>
          No rush, no grades — just curiosity, one page at a time.
        </p>
      </div>
    </>
  );
}
