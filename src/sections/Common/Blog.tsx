import { blogPosts } from "@/api/hardCodedData";
import BlogPostCard from "@/components/Pages/BlogCard";
import PageSection from "@/components/PageSection";

const BlogSection = async ({ t, short }: { t: Function; short?: boolean }) => {
  return (
    <PageSection
      title={t("Blog.Title")}
      subtitle={t("Blog.Subtitle")}
      id="blog"
    >
      <div className="row">
        {blogPosts.map((blogPost, index) => (
          <BlogPostCard key={index} short={short} {...blogPost} />
        ))}
      </div>
    </PageSection>
  );
};

export default BlogSection;
