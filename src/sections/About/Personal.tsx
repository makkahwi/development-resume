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
                <h3 className="h5 fw-bold mb-4">{name}</h3>
                <div className="d-flex flex-column gap-3">
                  {items.map((item, itemIndex) => (
                    <div key={itemIndex} className="d-flex align-items-start">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                        style={{ width: "28px", height: "28px" }}
                      >
                        <i
                          className="bi bi-circle-fill text-primary"
                          style={{ fontSize: "8px" }}
                        />
                      </div>
                      <span className="text-muted">{item}</span>
                    </div>
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
