import TraineeCard from "@/components/Pages/TraineeCard";
import PageSection from "@/components/PageSection";
import { traineesList } from "@/lib/data";

const MentoringSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Testimonials.Title")}
      subtitle={t("Testimonials.Subtitle")}
      id="trainees"
      color="light"
    >
      <p className="text-muted text-center mb-5">{t("Testimonials.Intro")}</p>

      <div className="row g-4">
        {traineesList
          .filter(({ featured }) => featured)
          .map((trainee, index) => (
            <TraineeCard key={index} {...trainee} />
          ))}
      </div>
    </PageSection>
  );
};

export default MentoringSection;
