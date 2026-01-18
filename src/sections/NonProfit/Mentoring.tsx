import TraineeCard from "@/components/Pages/TraineeCard";
import PageSection from "@/components/PageSection";
import { traineesList } from "@/lib/data";

const MentoringSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Mentoring.Title")}
      subtitle={t("Mentoring.Subtitle")}
      id="mentoring"
    >
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
