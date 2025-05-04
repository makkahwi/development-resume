import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function SponsorPage() {
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SponsorSection = dynamic(() => import("@/sections/sponsor"));

  return (
    <Fragment>
      <WorksSection openSource={true} />

      <SponsorSection />
    </Fragment>
  );
}
