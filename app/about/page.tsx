import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function AboutPage() {
  const AboutSection = dynamic(() => import("@/sections/about/about"));
  const EducationSection = dynamic(() => import("@/sections/education"));

  return (
    <Fragment>
      <AboutSection />

      <EducationSection />
    </Fragment>
  );
}
