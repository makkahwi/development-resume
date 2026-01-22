import ProjectCard from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";
import { projectsList } from "@/lib/data";

const ProjectsSection = async ({
  t,
  short,
  openSourceOnly,
  focOnly,
  color,
}: {
  t: Function;
  short?: boolean;
  openSourceOnly?: boolean;
  focOnly?: boolean;
  color?: string;
}) => {
  return (
    <PageSection
      title={t("Projects.Title")}
      subtitle={t("Projects.Subtitle")}
      id="projects"
      color={color}
    >
      <div className="row g-4">
        {projectsList
          .filter(
            ({ category, openSource, foc }) =>
              ["Web App", "Landing Page"].includes(category) &&
              (focOnly ? foc : openSourceOnly ? openSource : !openSource),
          )
          .map((project, index) => (
            <ProjectCard key={index} short={short} {...project} />
          ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
