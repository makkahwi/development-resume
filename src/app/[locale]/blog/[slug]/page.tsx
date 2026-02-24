import { brandConfig } from "@/brand/config";
import BlogSidebarPostCard from "@/components/Pages/BlogSidebarPostCard";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./styles.css";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale, slug } = await params;

  const post = await getBlogPost(locale, slug);
  const t = await getTranslations({
    locale,
    namespace: "BlogPost",
  });

  const base = brandConfig.appUrl;
  const path = `/${locale}/blog/${slug}`;

  const title = post ? `${t("TitlePrefix")}${post.title}` : t("TitlePrefix");

  const description = post
    ? `${post.excerpt}${t("DescriptionSuffix")}`
    : t("DescriptionSuffix");

  return {
    title,
    description,
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/blog/${slug}`,
        ar: `${base}/ar/blog/${slug}`,
      },
    },
  };
};

const BlogPostPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;

  const post = await getBlogPost(locale, slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "BlogPost" });

  // Get all posts for related and recent
  const allPosts = await getBlogPosts(locale);

  // Get recent posts (excluding current post)
  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // Get related posts (posts with overlapping tags, excluding current post)
  const relatedPosts = allPosts
    .filter((p) => {
      if (p.slug === slug) return false;
      return p.tags?.some((tag) => post.tags?.includes(tag)) ?? false;
    })
    .slice(0, 2);

  const publishedDate = new Date(post.publishedAt);
  const formattedDate =
    locale === "ar"
      ? publishedDate.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : publishedDate.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

  return (
    <main className="blog-post-page py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="blog-breadcrumb mb-4">
          <Link href={`/${locale}/blog`} className="breadcrumb-link">
            <i className="fas fa-arrow-left me-2"></i>
            {t("backToBlog")}
          </Link>
        </nav>

        <div className="row g-5">
          {/* Main Article Column */}
          <div className="col-lg-8">
            <article className="blog-post-article">
              {/* Featured Image */}
              {post.image && (
                <div className="blog-post-image mb-5">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${post.image}?alt=media`}
                    alt={post.title}
                    width={800}
                    height={400}
                    priority
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", height: "400px" }}
                  />
                </div>
              )}

              {/* Article Header */}
              <header className="blog-post-header mb-5">
                {/* Category Badge */}
                {post.category && (
                  <div className="blog-post-category mb-3">
                    <span className="badge bg-primary">{post.category}</span>
                  </div>
                )}

                {/* Title */}
                <h1 className="blog-post-title mb-3">{post.title}</h1>

                {/* Meta Information */}
                <div className="blog-post-meta">
                  <p className="blog-post-date text-muted mb-2">
                    <i className="fas fa-calendar me-2"></i>
                    {t("publishedOn")}:{" "}
                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                  </p>

                  {/* Tags */}
                  {post.tags?.length ? (
                    <div className="blog-post-tags">
                      <span className="fw-semibold me-2">
                        {t("tagsLabel")}:
                      </span>
                      <div className="tags-list">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag-badge">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </header>

              {/* Divider */}
              <hr className="blog-post-divider my-5" />

              {/* Article Content */}
              <section
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Return to Blog Link */}
              <div className="blog-post-footer mt-5 pt-4">
                <Link
                  href={`/${locale}/blog`}
                  className="btn btn-outline-primary"
                >
                  &larr; {t("backToBlog")}
                </Link>
              </div>
            </article>
          </div>

          {/* Sidebar Column */}
          <div className="col-lg-4">
            <aside className="blog-sidebar">
              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <section className="blog-related-section mb-5">
                  <h3 className="blog-sidebar-title mb-4">
                    <i className="fas fa-link me-2"></i>
                    {t("RelatedPosts") || "Related Posts"}
                  </h3>
                  <div className="blog-sidebar-posts-list">
                    {relatedPosts.map((relatedPost) => (
                      <BlogSidebarPostCard
                        key={relatedPost.id}
                        title={relatedPost.title}
                        slug={relatedPost.slug}
                        image={relatedPost.image}
                        publishedAt={relatedPost.publishedAt}
                        locale={locale}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Posts Section */}
              {recentPosts.length > 0 && (
                <section className="blog-recent-section">
                  <h3 className="blog-sidebar-title mb-4">
                    <i className="fas fa-clock me-2"></i>
                    {t("RecentPosts") || "Recent Posts"}
                  </h3>
                  <div className="blog-sidebar-posts-list">
                    {recentPosts.map((recentPost) => (
                      <BlogSidebarPostCard
                        key={recentPost.id}
                        title={recentPost.title}
                        slug={recentPost.slug}
                        image={recentPost.image}
                        publishedAt={recentPost.publishedAt}
                        locale={locale}
                      />
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
