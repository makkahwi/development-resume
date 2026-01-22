import PageSection from "@/components/PageSection";

const HelpGroupsSection = async ({ t }: { t: Function }) => {
  const mentoringGroups = [
    {
      title: t("Mentoring.Groups.Developers.Title"),
      body: t("Mentoring.Groups.Developers.Body"),
    },
    {
      title: t("Mentoring.Groups.WhoIHelp.Title"),
      body: t("Mentoring.Groups.WhoIHelp.Body"),
    },
    {
      title: t("Mentoring.Groups.Approach.Title"),
      body: t("Mentoring.Groups.Approach.Body"),
    },
  ];

  return (
    <PageSection
      title={t("Mentoring.Title")}
      subtitle={t("Mentoring.Subtitle")}
      id="mentoring"
      color="light"
    >
      <div className="row g-4">
        {mentoringGroups.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold mb-3">{title}</h3>
                <p className="text-muted mb-0">{body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HelpGroupsSection;
