import { jobsList } from "@/api/hardCodedData";
import ExperienceCard from "@/components/Pages/ExperienceCard";
import PageSection from "@/components/PageSection";

const ExperiencesSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Experiences.Title")}
      subtitle={t("Experiences.Subtitle")}
      id="experiences"
    >
      <div className="row">
        {jobsList.map((job, index) => (
          <ExperienceCard key={index} {...job} />
        ))}
      </div>
    </PageSection>
  );
};

export default ExperiencesSection;
