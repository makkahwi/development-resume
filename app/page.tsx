import { getSemesteerBlogEnPosts } from "@/api/data";
import NavbarComp from "@/layout/Navbar";
import { post } from "@/sections/home/blog";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function Home() {
  const WelcomeSection = dynamic(() => import("@/sections/home/welcome"));
  const CurrentWorksSection = dynamic(
    () => import("@/sections/home/currentWorks")
  );
  const BlogSection = dynamic(() => import("@/sections/home/blog"));
  const BackgroundSection = dynamic(() => import("@/sections/home/background"));
  const AboutSection = dynamic(() => import("@/sections/home/about"));

  const posts: post[] = await getSemesteerBlogEnPosts();

  return (
    <Fragment>
      <WelcomeSection />

      <NavbarComp />

      <AboutSection />

      {/* <StatsSection /> */}

      <BackgroundSection />

      <CurrentWorksSection />

      <BlogSection posts={posts} />
    </Fragment>
  );
}
