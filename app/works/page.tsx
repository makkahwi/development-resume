import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function WorksPage() {
  const CareerSection = dynamic(() => import("@/sections/experiences"));
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SkillsSection = dynamic(() => import("@/sections/skills"));

  return (
    <Fragment>
      <CareerSection />

      <WorksSection />

      <SkillsSection />
    </Fragment>
  );
}
