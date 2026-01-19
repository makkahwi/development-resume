import PageSection from "@/components/PageSection";

const PersonalSection = async ({ t }: { t: Function }) => {
  const personalParts = [
    {
      name: t("Personal.Hobbies.Title"),
      items: [
        t("Personal.Hobbies.Chess"),
        t("Personal.Hobbies.Swimming"),
        t("Personal.Hobbies.BuildingSideProjects"),
        t("Personal.Hobbies.HealthyLifestyle"),
        t("Personal.Hobbies.EnvironmentalActivities"),
      ],
    },
    {
      name: t("Personal.LearningPhilosophy.Title"),
      items: [
        t("Personal.LearningPhilosophy.SelfLearning"),
        t("Personal.LearningPhilosophy.OneOnOneCoaching"),
        t("Personal.LearningPhilosophy.ProjectBasedDevelopment"),
      ],
    },
  ];

  return (
    <PageSection
      title={t("Personal.Title")}
      subtitle={t("Personal.Subtitle")}
      id="personal"
    >
      {personalParts.map(({ name, items }, index) => (
        <div key={index} className="row mb-4 text-center">
          <div className="col-12">
            <h3>{name}</h3>
          </div>

          {items.map((item, itemIndex) => (
            <div key={itemIndex} className="col-12 col-md-4 mb-2">
              <span>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </PageSection>
  );
};

export default PersonalSection;
