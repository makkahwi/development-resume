import { projectsList } from "@/api/hardCodedData";
import ProjectCard from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";

const ProjectsSection = async ({
  t,
  short,
  openSourceOnly,
  focOnly,
}: {
  t: Function;
  short?: boolean;
  openSourceOnly?: boolean;
  focOnly?: boolean;
}) => {
  return (
    <PageSection
      title={t("Projects.Title")}
      subtitle={t("Projects.Subtitle")}
      id="projects"
    >
      <div className="row">
        {projectsList
          .filter(
            ({ category, openSource, foc }) =>
              ["Web App", "Landing Page"].includes(category) &&
              (focOnly ? foc : openSourceOnly ? openSource : !openSource)
          )
          .map((project, index) => (
            <ProjectCard key={index} short={short} {...project} />
          ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
