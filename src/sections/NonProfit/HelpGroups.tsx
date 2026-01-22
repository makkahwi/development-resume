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
    >
      <div className="row g-3">
        {mentoringGroups.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-2">{title}</h3>
              <p className="small text-muted mb-0">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HelpGroupsSection;
