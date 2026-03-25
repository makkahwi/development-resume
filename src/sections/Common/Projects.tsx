import ProjectCard from "@/components/Pages/ProjectCard";
import PageSection from "@/components/PageSection";
import { getProjectsList } from "@/lib/data";

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
  t: (key: string) => string;
  short?: boolean;
  openSourceOnly?: boolean;
  focOnly?: boolean;
  color?: string;
  showFilters?: boolean;
  activeCategory?: string;
  basePath?: string;
}) => {
  const projectsList = await getProjectsList();

  const filterOptions = showFilters
    ? [
        { label: t("Projects.Filters.All"), value: "All" },
        { label: t("Projects.Filters.WebApp"), value: "Web App" },
        { label: t("Projects.Filters.MobileApp"), value: "Mobile App" },
        { label: t("Projects.Filters.LandingPage"), value: "Landing Page" },
      ]
    : [];

  const selectedCategory = filterOptions.some(
    (option) => option.value === activeCategory,
  )
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
            const isActive = option.value === selectedCategory;
            const href =
              option.value === "All"
                ? basePath
                : `${basePath}?category=${encodeURIComponent(option.value)}`;

            return (
              <a
                key={option.value}
                href={href}
                className={`btn btn-sm ${
                  isActive ? "btn-primary" : "btn-secondary"
                } px-4 border-0 corners`}
              >
                {option.label}
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
            <ProjectCard
              key={index}
              short={short}
              viewProjectLabel={t("Projects.ViewProject")}
              {...project}
            />
          ))}
      </div>
    </PageSection>
  );
};

export default ProjectsSection;
