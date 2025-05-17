import PageNavigator from "@/layout/PageNavigator";
import {
  faChalkboard,
  faChalkboardUser,
  faCode,
  faGraduationCap,
  faHandshake,
  faHeart,
  faPerson,
  faPlaneArrival,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
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

  const sections = [
    { id: "intro", label: "Intro", icon: faHandshake },
    { id: "works", label: "Works", icon: faCode },
    { id: "training", label: "Training", icon: faChalkboardUser },
    { id: "consultation", label: "Consultation", icon: faUserDoctor },
    { id: "sponsor", label: "Sponsor", icon: faHeart },
  ];

  return (
    <Fragment>
      <PageNavigator sections={sections} />

      <IntroSection />

      <WorksSection openSource={true} />

      <TrainingSection />

      <ConsultationSection />

      <SponsorSection />
    </Fragment>
  );
}
