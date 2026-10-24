import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} - Right Account`,
    description: article.description,
  };
}

export default function LearnArticlePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
          Loading article...
        </div>
      }
    >
      <LearnArticleContent params={params} />
    </Suspense>
  );
}

async function LearnArticleContent({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {article.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {article.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <time>{article.date}</time>
            </div>
          </div>

          {article.price && (
            <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Course registration
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {article.level} · {article.duration} · {article.price}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Register your interest and the Right Account team will share
                  the next steps.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link
                  href={`/register?type=customer&course=${encodeURIComponent(article.slug)}`}
                >
                  Register interest
                </Link>
              </Button>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote source={article.content} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
