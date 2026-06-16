import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { news } from "@/data/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }): { article: (typeof news)[number] } => {
    const article = news.find((n) => n.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — BrightFuture Academy` : "Article — BrightFuture Academy";
    const desc = a?.excerpt ?? "News article from BrightFuture Academy";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/news/${params.slug}` },
        { property: "og:type", content: "article" },
        ...(a ? [{ property: "og:image", content: a.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: a.title,
                datePublished: a.date,
                author: { "@type": "Person", name: a.author },
                image: a.image,
              }),
            },
          ]
        : [],
    };
  },
  component: NewsDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Button asChild className="mt-6"><Link to="/news">Back to news</Link></Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <Button asChild className="mt-6"><Link to="/news">Back to news</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function NewsDetail() {
  const { article } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article>
        <div className="bg-muted/50 py-8">
          <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/news"><ArrowLeft className="mr-1 h-4 w-4" /> All news</Link>
            </Button>
          </div>
        </div>
        <header className="mx-auto w-full max-w-3xl px-4 pt-8 lg:px-8">
          <Badge variant="secondary">{article.category}</Badge>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{article.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(article.date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })} • {article.author}
          </p>
        </header>
        <div className="mx-auto mt-8 w-full max-w-3xl px-4 lg:px-8">
          <img src={article.image} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover shadow-md" loading="eager" />
        </div>
        <div className="mx-auto w-full max-w-3xl px-4 py-12 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground">
            {article.content.map((p, i) => (
              <p key={i} className="mt-4 text-foreground/85 leading-relaxed first:mt-0">{p}</p>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
