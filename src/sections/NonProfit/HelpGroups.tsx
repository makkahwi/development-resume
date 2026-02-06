import PageSection from "@/components/PageSection";

const HelpGroupsSection = async ({ t }: { t: Function }) => {
  const mentoringGroups = [
    {
      title: t("Mentoring.Groups.Developers.Title"),
      body: t("Mentoring.Groups.Developers.Body"),
      icon: "fa-solid fa-code",
    },
    {
      title: t("Mentoring.Groups.WhoIHelp.Title"),
      body: t("Mentoring.Groups.WhoIHelp.Body"),
      icon: "fa-solid fa-people-group",
    },
    {
      title: t("Mentoring.Groups.Approach.Title"),
      body: t("Mentoring.Groups.Approach.Body"),
      icon: "fa-solid fa-compass",
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
        {mentoringGroups.map(({ title, body, icon }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100 border-0 p-3 shadow-sm">
              <div className="card-body">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "44px", height: "44px" }}
                >
                  <i className={`${icon} text-primary`} />
                </div>
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
