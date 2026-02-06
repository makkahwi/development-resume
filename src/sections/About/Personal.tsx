import PageSection from "@/components/PageSection";

const PersonalSection = async ({ t }: { t: Function }) => {
  const personalParts = [
    {
      name: t("Personal.Groups.Hobbies"),
      items: [
        t("Personal.Hobbies.Chess"),
        t("Personal.Hobbies.Swimming"),
        t("Personal.Hobbies.BuildingSideProjects"),
        t("Personal.Hobbies.HealthyLifestyle"),
        t("Personal.Hobbies.EnvironmentalActivities"),
      ],
    },
    {
      name: t("Personal.Groups.Learning"),
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
      <div className="row g-4">
        {personalParts.map(({ name, items }, index) => (
          <div key={index} className="col-md-6">
            <div className="card bg-light h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 fw-bold mb-0">{name}</h3>
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {items.length}
                  </span>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="badge bg-white text-primary border border-primary border-opacity-25"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default PersonalSection;
