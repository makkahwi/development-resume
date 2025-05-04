import { apiCallRevalidate } from "@/api/data";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export const revalidate = apiCallRevalidate;

export default async function Home() {
  const WelcomeSection = dynamic(() => import("@/sections/welcome"));
  const AboutSection = dynamic(() => import("@/sections/about/about"));
  const CareerSection = dynamic(() => import("@/sections/experiences"));
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));

  return (
    <Fragment>
      <WelcomeSection />

      <AboutSection home={true} />

      <CareerSection home={true} />

      <WorksSection home={true} />

      <SkillsSection home={true} />

      {/* <BlogSection posts={posts} /> */}
    </Fragment>
  );
}
