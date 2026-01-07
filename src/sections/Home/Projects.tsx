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
    <PageSection
      title={t("Projects.Title")}
      subtitle={t("Projects.Subtitle")}
      id="projects"
    >
      <div className="row">
        {projectsList
          .filter(({ category }) => category === "Web App")
          .map((project, index) => (
            <ProjectCard key={index} short={short} {...project} />
          ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
