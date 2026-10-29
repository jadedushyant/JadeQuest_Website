import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/layout";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section, Tag } from "@/components/ui";
import { articles, getArticle } from "@/content/articles";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, orgRef, pageMeta } from "@/lib/seo";
import { Clock, Calendar, ArrowLeft, ArrowUpRight, CheckCircle2, Bookmark } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMeta({
    title: article.title,
    description: article.summary,
    path: `/blog/${article.slug}`,
  });
}

export default async function ArticleDetailPage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.summary,
          datePublished: article.publishedAt,
          author: {
            "@type": "Person",
            name: article.author.name,
            jobTitle: article.author.role,
          },
          publisher: orgRef,
          url: absoluteUrl(`/blog/${article.slug}`),
        }}
      />

      <PageHero
        eyebrow={`Engineering Insight · ${article.category}`}
        title={article.title}
        size="h1"
        intro={article.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: article.category },
        ]}
        aside={
          <div className="flex flex-col gap-4 text-xs font-mono text-subtle">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan" />
              <span>Published: {article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple" />
              <span>{article.readTime}</span>
            </div>
            <div className="pt-3 border-t border-line flex flex-col gap-1">
              <span className="text-paper font-semibold">{article.author.name}</span>
              <span>{article.author.role}</span>
            </div>
          </div>
        }
      />

      <Section theme="dark">
        <Container className="max-w-4xl flex flex-col gap-12">
          {/* Key Takeaways Callout */}
          {article.keyTakeaways && (
            <div className="p-8 rounded-card border border-cyan/30 bg-surface-raised relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-cyan">
                <Bookmark className="w-5 h-5" />
                <h2 className="font-display text-lg font-semibold text-paper">
                  Executive Summary & Key Takeaways
                </h2>
              </div>
              <ul className="flex flex-col gap-3">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <div className="flex flex-col gap-6 text-mist text-lg leading-relaxed font-sans">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-paper/90">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-line flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs uppercase tracking-wider text-subtle mr-2">
              Topics:
            </span>
            {article.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {/* Back link */}
          <div className="pt-4">
            <TransitionLink
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan hover:text-paper transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all insights</span>
            </TransitionLink>
          </div>
        </Container>
      </Section>

      {/* Related Insights */}
      {related.length > 0 && (
        <Section theme="stone" aria-labelledby="related-heading">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <Eyebrow>Further Reading</Eyebrow>
              <h2 id="related-heading" className="font-display text-h2 font-semibold text-paper">
                Related technical insights
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {related.map((rel) => (
                <div
                  key={rel.slug}
                  className="flex flex-col justify-between p-8 rounded-card border border-line bg-surface hover:border-cyan/40 transition-all duration-300"
                >
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-xs text-cyan uppercase tracking-wider">
                      {rel.category} · {rel.readTime}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-paper hover:text-cyan transition-colors">
                      <TransitionLink href={`/blog/${rel.slug}`}>{rel.title}</TransitionLink>
                    </h3>
                    <p className="text-sm text-mist line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-line flex justify-between items-center">
                    <span className="text-xs text-subtle font-mono">{rel.author.name}</span>
                    <TransitionLink
                      href={`/blog/${rel.slug}`}
                      className="text-xs font-mono uppercase tracking-wider text-cyan hover:text-paper font-semibold inline-flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
