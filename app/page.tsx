import { apiCallRevalidate } from "@/api/data";
import PageNavigator from "@/layout/PageNavigator";
import HappyClientsSection from "@/sections/clients";
import {
  faBriefcase,
  faCode,
  faPerson,
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export const revalidate = apiCallRevalidate;

export default async function Home() {
  const WelcomeSection = dynamic(() => import("@/sections/welcome"));
  const AboutSection = dynamic(() => import("@/sections/about/about"));
  const CareerSection = dynamic(() => import("@/sections/experiences"));
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));

  const sections = [
    { id: "about", label: "About", icon: faPerson },
    { id: "experiences", label: "Experiences", icon: faBriefcase },
    { id: "works", label: "Works", icon: faCode },
    { id: "skills", label: "Skills", icon: faPersonCircleCheck },
  ];

  return (
    <Fragment>
      <PageNavigator sections={sections} />

      <WelcomeSection />

      <WorksSection home={true} />

      <SkillsSection home={true} />

      <HappyClientsSection />

      {/* <BlogSection posts={posts} /> */}
    </Fragment>
  );
}
