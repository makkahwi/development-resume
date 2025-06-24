import { apiCallRevalidate } from "@/api/data";
import PageNavigator from "@/layout/PageNavigator";
import {
  faBriefcase,
  faCode,
  faFaceSmile,
  faHome,
  faPerson,
  faPersonCircleCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export const revalidate = apiCallRevalidate;

export default async function Home() {
  const WelcomeSection = dynamic(() => import("@/sections/welcome"));
  const AboutSection = dynamic(() => import("@/sections/about/about"));
  const CareerSection = dynamic(
    () => import("@/sections/experiences/experiences")
  );
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));
  const ProminentClientsSection = dynamic(() => import("@/sections/clients"));
  const TestimonialsSection = dynamic(() => import("@/sections/testimonials"));

  const sections = [
    { id: "home", label: "Home", icon: faHome },
    { id: "works", label: "Works", icon: faCode },
    { id: "skills", label: "Skills", icon: faPersonCircleCheck },
    { id: "clients", label: "Clients", icon: faFaceSmile },
    { id: "testimonials", label: "Testimonials", icon: faStar },
  ];

  return (
    <Fragment>
      <PageNavigator sections={sections} />

      <WelcomeSection />

      <WorksSection home={true} />

      <SkillsSection home={true} />

      <ProminentClientsSection />

      <TestimonialsSection />

      {/* <BlogSection posts={posts} /> */}
    </Fragment>
  );
}
