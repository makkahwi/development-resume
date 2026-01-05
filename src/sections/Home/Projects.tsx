import ProjectCard, { ProjectProps } from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";

const ProjectsSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  const projects: ProjectProps[] = [
    {
      title: "Project Alpha",
      description: "An innovative solution for modern problems.",
      image: "/images/projects/alpha.png",
      url: "https://example.com/project-alpha",
      technologies: ["React", "Node.js", "GraphQL"],
    },
  ];

  return (
    <PageSection title={t("title")} subtitle={t("subtitle")} id="projects">
      <div className="row">
        {projects.map((project, index) => (
          <ProjectCard key={index} short={short} {...project} />
        ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
