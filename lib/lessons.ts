import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PYTHON_DIR = path.join(process.cwd(), "content", "python");

export type LessonFrontmatter = {
  title: string;
  order: number;
  summary?: string;
};

export type LessonMeta = LessonFrontmatter & { slug: string };

export function getLessonSlugs(): string[] {
  return fs
    .readdirSync(PYTHON_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getLessonSource(slug: string): string {
  const filePath = path.join(PYTHON_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf8");
}

/** Splits a lesson file into its frontmatter and MDX body (frontmatter stripped). */
export function getLesson(slug: string): { frontmatter: LessonFrontmatter; content: string } {
  const { data, content } = matter(getLessonSource(slug));
  return { frontmatter: data as LessonFrontmatter, content };
}

export function getAllLessons(): LessonMeta[] {
  return getLessonSlugs()
    .map((slug) => {
      const { data } = matter(getLessonSource(slug));
      return { ...(data as LessonFrontmatter), slug };
    })
    .sort((a, b) => a.order - b.order);
}

export function getAdjacentLessons(slug: string) {
  const lessons = getAllLessons();
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}
