import PageNavigator from "@/layout/PageNavigator";
import { faGraduationCap, faPerson } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function AboutPage() {
  const AboutSection = dynamic(() => import("@/sections/about/about"));
  const EducationSection = dynamic(() => import("@/sections/education"));

  const sections = [
    { id: "about", label: "About", icon: faPerson },
    { id: "education", label: "Education", icon: faGraduationCap },
  ];

  return (
    <Fragment>
      <PageNavigator sections={sections} />

      <AboutSection />

      <EducationSection />
    </Fragment>
  );
}
