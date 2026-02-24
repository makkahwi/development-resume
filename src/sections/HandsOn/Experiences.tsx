import ExperienceCard from "@/components/Pages/ExperienceCard";
import PageSection from "@/components/PageSection";
import { getClientsList, getJobsList } from "@/lib/data";

const ExperiencesSection = async ({ t }: { t: (key: string) => string }) => {
  const [jobsList, clientsList] = await Promise.all([
    getJobsList(),
    getClientsList(),
  ]);

  return (
    <PageSection
      title={t("Experiences.Title")}
      subtitle={t("Experiences.Subtitle")}
      id="experiences"
      color="light"
    >
      <div className="row g-4">
        {jobsList.map((job, index) => {
          const companyLogo = clientsList.find(
            (client) => client.label === job.company,
          )?.image;

          return (
            <ExperienceCard
              key={index}
              companyLogo={companyLogo}
              viewEmployerLabel={t("Experiences.ViewEmployer")}
              {...job}
            />
          );
        })}
      </div>
    </PageSection>
  );
};

export default ExperiencesSection;
