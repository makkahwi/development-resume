import ExperienceCard from "@/components/Pages/ExperienceCard";
import PageSection from "@/components/PageSection";
import { jobsList } from "@/lib/data";

const ExperiencesSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Experiences.Title")}
      subtitle={t("Experiences.Subtitle")}
      id="experiences"
      color="light"
    >
      <div className="row g-4">
        {jobsList.map((job, index) => (
          <ExperienceCard key={index} {...job} />
        ))}
      </div>
    </PageSection>
  );
};

export default ExperiencesSection;
