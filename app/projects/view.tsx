import PagesLayout from "@/layout/PagesLayout";
import dynamic from "next/dynamic";

const ProjectsPage = () => {
  const WhySection = dynamic(() => import("@/sections/projects/why"));
  const ProjectsSection = dynamic(() => import("@/sections/projects/projects"));

  return (
    <PagesLayout>
      <WhySection />

      <ProjectsSection />
    </PagesLayout>
  );
};

export default ProjectsPage;
