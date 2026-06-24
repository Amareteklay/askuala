export type LearnerSlug = "rodas" | "yohana";

export type Learner = {
  slug: LearnerSlug;
  name: string;
  age: number;
  siblingName: string;
};

export const LEARNERS: Record<LearnerSlug, Learner> = {
  rodas: { slug: "rodas", name: "Rodas", age: 15, siblingName: "Yohana" },
  yohana: { slug: "yohana", name: "Yohana", age: 13, siblingName: "Rodas" },
};

export function isLearnerSlug(slug: string): slug is LearnerSlug {
  return slug === "rodas" || slug === "yohana";
}

export function getLearner(slug: string): Learner | null {
  return isLearnerSlug(slug) ? LEARNERS[slug] : null;
}

/**
 * Lesson content uses {{name}}, {{sibling}}, {{age}} placeholders so every
 * lesson speaks to whoever is actually reading it, not whichever kid the
 * example happened to be written for.
 */
export function personalize(source: string, learner: Learner): string {
  const siblingSlug: LearnerSlug = learner.slug === "rodas" ? "yohana" : "rodas";
  const sibling = LEARNERS[siblingSlug];
  return source
    .replaceAll("{{name}}", learner.name)
    .replaceAll("{{sibling}}", learner.siblingName)
    .replaceAll("{{age}}", String(learner.age))
    .replaceAll("{{siblingAge}}", String(sibling.age));
}
