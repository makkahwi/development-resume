import ProjectCard from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";
import { projectsList } from "@/lib/data";

const ProjectsSection = async ({
  t,
  short,
  openSourceOnly,
  focOnly,
  color,
  showFilters,
  activeCategory,
  basePath,
}: {
  t: Function;
  short?: boolean;
  openSourceOnly?: boolean;
  focOnly?: boolean;
  color?: string;
  showFilters?: boolean;
  activeCategory?: string;
  basePath?: string;
}) => {
  const filterOptions = ["All", "Web App", "Landing Page"];
  const selectedCategory = filterOptions.includes(activeCategory || "")
    ? activeCategory
    : "All";

  return (
    <PageSection
      title={t("Projects.Title")}
      subtitle={t("Projects.Subtitle")}
      id="projects"
      color={color}
    >
      {showFilters && basePath && (
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {filterOptions.map((option) => {
            const isActive = option === selectedCategory;
            const href =
              option === "All"
                ? basePath
                : `${basePath}?category=${encodeURIComponent(option)}`;

            return (
              <a
                key={option}
                href={href}
                className={`btn btn-sm ${
                  isActive ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                {option}
              </a>
            );
          })}
        </div>
      )}

      <div className="row g-4">
        {projectsList
          .filter(
            ({ category, openSource, foc, featured }) =>
              (showFilters || ["Web App", "Landing Page"].includes(category)) &&
              (short
                ? featured
                : focOnly
                  ? foc
                  : openSourceOnly
                    ? openSource
                    : !openSource),
          )
          .filter((project) =>
            selectedCategory === "All"
              ? true
              : project.category === selectedCategory,
          )
          .map((project, index) => (
            <ProjectCard key={index} short={short} {...project} />
          ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
