import { projectsList } from "@/api/hardCodedData";
import ProjectCard from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";

const ProjectsSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  return (
    <PageSection title={t("title")} subtitle={t("subtitle")} id="projects">
      <div className="row">
        {projectsList.map((project, index) => (
          <ProjectCard key={index} short={short} {...project} />
        ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
