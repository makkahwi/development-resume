import { getSemesteerBlogEnPosts } from "@/api/data";
import NavbarComp from "@/layout/Navbar";
import { post } from "@/sections/blog/blog";
import EducationSection from "@/sections/education";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function Home() {
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const WelcomeSection = dynamic(() => import("@/sections/welcome"));
  const CareerSection = dynamic(() => import("@/sections/experiences"));
  const BlogSection = dynamic(() => import("@/sections/blog/blog"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));
  const AboutSection = dynamic(() => import("@/sections/about/about"));

  const posts: post[] = await getSemesteerBlogEnPosts();

  return (
    <Fragment>
      <WelcomeSection />

      <NavbarComp />

      <AboutSection />

      <CareerSection />

      <WorksSection />

      <SkillsSection />

      <EducationSection />

      <BlogSection posts={posts} />
    </Fragment>
  );
}
