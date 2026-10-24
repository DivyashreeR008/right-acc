import { CourseCard } from "@/components/learn/course-card";
import { getAllArticles } from "@/lib/mdx";
import { Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Courses & Learning - Right Account",
  description:
    "Explore practical courses and training programs to build your business and finance skills.",
};

export default function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  return (
    <div className="min-h-full bg-slate-50/70">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
            Practical learning
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Skills you can put to work
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
            Short, industry-focused courses in accounting, tax and business
            operations—built around the work people do every day.
          </p>
          <form
            action="/learn"
            className="mt-5 flex max-w-2xl gap-2 rounded-xl bg-white p-1.5"
          >
            <label className="flex min-h-10 flex-1 items-center gap-2 px-2 text-slate-500">
              <Search className="size-4 shrink-0 text-primary" />
              <span className="sr-only">Search courses</span>
              <input
                name="q"
                placeholder="Search for a course (e.g. Tax, GST, Financial Analysis)"
                className="w-full bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 text-xs font-semibold text-white hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-7xl px-5 py-8 text-sm text-muted-foreground sm:px-8 lg:px-10">
            Loading learning resources...
          </div>
        }
      >
        <CourseResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function CourseResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q;
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const articles = getAllArticles()
    .filter((article) => Boolean(article.price))
    .filter((article) =>
      normalizedQuery
        ? `${article.title} ${article.category} ${article.description}`
            .toLowerCase()
            .includes(normalizedQuery)
        : true,
    );

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            COURSE CATALOG
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-foreground sm:text-2xl">
            Practical courses
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {articles.length} courses
        </span>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => (
            <CourseCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              description={article.description}
              category={article.category}
              level={article.level}
              duration={article.duration}
              price={article.price}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-white py-14 text-center">
          <Search className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold text-foreground">
            No courses match that search
          </p>
          <Link
            href="/learn"
            className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline"
          >
            Browse all courses
          </Link>
        </div>
      )}
    </section>
  );
}
