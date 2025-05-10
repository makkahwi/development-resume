import ConsultationSection from "@/sections/helps/intro";
import dynamic from "next/dynamic";
import { Fragment } from "react";

export default async function HelpsPage() {
  const WorksSection = dynamic(() => import("@/sections/works/works"));
  const SponsorSection = dynamic(() => import("@/sections/helps/sponsor"));

  return (
    <Fragment>
      <ConsultationSection />

      <WorksSection openSource={true} />

      <SponsorSection />
    </Fragment>
  );
}
