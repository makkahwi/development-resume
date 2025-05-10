import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function HelpsPage() {
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SponsorSection = dynamic(() => import("@/sections/helps/sponsor"));
  const IntroSection = dynamic(() => import("@/sections/helps/intro"));

  return (
    <Fragment>
      <IntroSection />

      <WorksSection openSource={true} />

      <SponsorSection />
    </Fragment>
  );
}
