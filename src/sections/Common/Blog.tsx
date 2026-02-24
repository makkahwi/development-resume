import BlogPostCard from "@/components/Pages/BlogCard";
import PageSection from "@/components/PageSection";
import { getBlogPosts } from "@/lib/data";

const BlogSection = async ({
  title,
  subtitle,
  locale,
  short,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  locale: string;
  short?: boolean;
  ctaLabel: string;
}) => {
  const posts = await getBlogPosts(locale);
  const visiblePosts = short ? posts.slice(0, 3) : posts;

  return (
    <PageSection title={title} subtitle={subtitle} id="blog">
      <div className="row g-4">
        {visiblePosts.map((blogPost) => (
          <BlogPostCard
            key={blogPost.id}
            short={short}
            locale={locale}
            ctaLabel={ctaLabel}
            {...blogPost}
          />
        ))}
      </div>
    </PageSection>
  );
};

export default BlogSection;
