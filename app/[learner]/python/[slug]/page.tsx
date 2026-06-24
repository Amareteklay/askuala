import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAdjacentLessons, getLesson, getLessonSlugs } from "@/lib/lessons";
import { getLearner, LEARNERS, personalize } from "@/lib/learners";
import LazyPyodideRepl from "@/components/LazyPyodideRepl";
import Exercise from "@/components/Exercise";

export function generateStaticParams() {
  const slugs = getLessonSlugs();
  return Object.keys(LEARNERS).flatMap((learner) =>
    slugs.map((slug) => ({ learner, slug })),
  );
}

const mdxComponents = {
  LazyPyodideRepl,
  Exercise,
};

export default function LessonPage({
  params,
}: {
  params: { learner: string; slug: string };
}) {
  const learner = getLearner(params.learner);
  if (!learner) notFound();

  let frontmatter: { title: string; order: number; summary?: string };
  let content: string;
  try {
    const lesson = getLesson(params.slug);
    frontmatter = {
      ...lesson.frontmatter,
      title: personalize(lesson.frontmatter.title, learner),
      summary: lesson.frontmatter.summary
        ? personalize(lesson.frontmatter.summary, learner)
        : undefined,
    };
    content = personalize(lesson.content, learner);
  } catch {
    notFound();
  }

  const { previous, next } = getAdjacentLessons(params.slug);
  const previousTitle = previous ? personalize(previous.title, learner) : null;
  const nextTitle = next ? personalize(next.title, learner) : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href={`/${learner.slug}/python`}
        className="font-mono text-xs uppercase tracking-wide text-neutral-400 hover:text-neutral-600"
      >
        ← Python course
      </Link>

      <header className="mt-6 border-b border-neutral-200 pb-6">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-400">
          Lesson {String(frontmatter!.order).padStart(2, "0")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--ink)]">
          {frontmatter!.title}
        </h1>
        {frontmatter!.summary && (
          <p className="mt-2 text-neutral-500">{frontmatter!.summary}</p>
        )}
      </header>

      <article className="prose prose-neutral mt-8 max-w-none prose-headings:text-[var(--ink)] prose-p:text-[var(--ink)] prose-li:text-[var(--ink)] prose-strong:text-[var(--ink)]">
        <MDXRemote source={content!} components={mdxComponents} />
      </article>

      <nav className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6">
        {previous ? (
          <Link
            href={`/${learner.slug}/python/${previous.slug}`}
            className="text-sm text-neutral-500 hover:text-neutral-800"
          >
            ← {previousTitle}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${learner.slug}/python/${next.slug}`}
            className="text-sm text-neutral-500 hover:text-neutral-800"
          >
            {nextTitle} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
