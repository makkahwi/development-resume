import PageNavigator from "@/layout/PageNavigator";
import {
  faBriefcase,
  faCode,
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function WorksPage() {
  const CareerSection = dynamic(
    () => import("@/sections/experiences/experiences")
  );
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));

  const sections = [
    { id: "experiences", label: "Experiences", icon: faBriefcase },
    { id: "works", label: "Works", icon: faCode },
    { id: "skills", label: "Skills", icon: faPersonCircleCheck },
  ];

  return (
    <Fragment>
      <PageNavigator sections={sections} />

      <CareerSection />

      <WorksSection />

      <SkillsSection />
    </Fragment>
  );
}
