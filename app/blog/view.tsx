import { getSemesteerBlogEnPosts } from "@/api/data";
import PagesLayout from "@/layout/PagesLayout";
import { post } from "@/sections/home/blog";
import dynamic from "next/dynamic";

const BlogPage = async () => {
  const posts: post[] = await getSemesteerBlogEnPosts();

  const BlogSection = dynamic(() => import("@/sections/home/blog"));

  return (
    <PagesLayout>
      <BlogSection posts={posts} page />
    </PagesLayout>
  );
};

export default BlogPage;
