import BlogPostCard, { BlogProps } from "@/components/Pages/BlogCard";
import PageSection from "@/components/PageSection";

const BlogSection = async ({ t, short }: { t: Function; short?: boolean }) => {
  const blogPosts: BlogProps[] = [
    {
      title: "Understanding React Hooks",
      image: "/images/blog/react-hooks.png",
      content:
        "React Hooks are functions that let you use state and other React features without writing a class...",
    },
  ];

  return (
    <PageSection
      title={t("blog.title")}
      subtitle={t("blog.description")}
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
