import { getSemesteerBlogEnPosts } from "@/api/data";
import NavbarComp from "@/layout/Navbar";
import { post } from "@/sections/home/blog";
import EducationSection from "@/sections/home/education";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function Home() {
  const WorksSection = dynamic(() => import("@/sections/career/works"));
  const WelcomeSection = dynamic(() => import("@/sections/home/welcome"));
  const CareerSection = dynamic(() => import("@/sections/career/career"));
  const BlogSection = dynamic(() => import("@/sections/home/blog"));
  const SkillsSection = dynamic(() => import("@/sections/home/skills"));
  const AboutSection = dynamic(() => import("@/sections/home/about"));

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
