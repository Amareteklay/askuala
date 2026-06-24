import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLessons } from "@/lib/lessons";
import { getLearner, LEARNERS, personalize } from "@/lib/learners";

export function generateStaticParams() {
  return Object.keys(LEARNERS).map((learner) => ({ learner }));
}

export default function PythonCourseIndex({
  params,
}: {
  params: { learner: string };
}) {
  const learner = getLearner(params.learner);
  if (!learner) notFound();

  const lessons = getAllLessons();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-neutral-400">
        Summer 2026 — {learner.name}&apos;s course
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Python course</h1>
      <p className="mt-2 text-neutral-500">
        Ten lessons, fundamentals to your own project. Work through them in
        order — each one builds on the last.
      </p>

      <ol className="mt-10 space-y-3">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/${learner.slug}/python/${lesson.slug}`}
              className="flex items-baseline gap-3 rounded-md border border-neutral-200 px-4 py-3 transition hover:border-neutral-400 hover:bg-neutral-50"
            >
              <span className="font-mono text-sm text-neutral-400">
                {String(lesson.order).padStart(2, "0")}
              </span>
              <span className="font-medium">{personalize(lesson.title, learner)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
