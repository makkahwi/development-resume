import TraineeCard from "@/components/Pages/TraineeCard";
import PageSection from "@/components/PageSection";
import { traineesList } from "@/lib/data";

const MentoringSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Testimonials.Title")}
      subtitle={t("Mentoring.Subtitle")}
      id="mentoring"
    >
      <p className="small text-muted mb-3">{t("Testimonials.Intro")}</p>

      <div className="row">
        {traineesList
          .filter(({ highlight }) => highlight)
          .map((trainee, index) => (
            <TraineeCard key={index} {...trainee} />
          ))}
      </div>
    </PageSection>
  );
};

export default MentoringSection;
