import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function HelpsPage() {
  const IntroSection = dynamic(() => import("@/sections/helps/intro"));
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const TrainingSection = dynamic(() => import("@/sections/helps/training"));
  const ConsultationSection = dynamic(
    () => import("@/sections/helps/consultation")
  );
  const SponsorSection = dynamic(() => import("@/sections/helps/sponsor"));

  return (
    <Fragment>
      <IntroSection />

      <WorksSection openSource={true} />

      <TrainingSection />

      <ConsultationSection />

      <SponsorSection />
    </Fragment>
  );
}
