import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const contentDirectory = join(process.cwd(), "src/content/learn");

export interface LearnArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  price?: string;
  level?: string;
  duration?: string;
  content: string;
  frontmatter: Record<string, unknown>;
}

export function getAllArticles(): LearnArticle[] {
  const slugs = readdirSync(contentDirectory).filter((f) => f.endsWith(".mdx"));

  return slugs
    .map((slug) => getArticleBySlug(slug.replace(/\.mdx$/, "")))
    .filter((article): article is LearnArticle => article !== null)
    .sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    });
}

export function getArticleBySlug(slug: string): LearnArticle | null {
  try {
    const fullPath = join(contentDirectory, `${slug}.mdx`);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      category: data.category as string,
      readTime: data.readTime as string,
      price: data.price as string | undefined,
      level: data.level as string | undefined,
      duration: data.duration as string | undefined,
      content,
      frontmatter: data,
    };
  } catch {
    return null;
  }
}
