import PageSection from "@/components/PageSection";

const HandsOffDecisions = async ({ t }: { t: any }) => {
  const decisions = [
    { text: t("Decisions.Items.FeatureScope"), icon: "fa-solid fa-flag" },
    {
      text: t("Decisions.Items.UxAlignment"),
      icon: "fa-solid fa-table-columns",
    },
    {
      text: t("Decisions.Items.AuthModels"),
      icon: "fa-solid fa-shield-halved",
    },
    { text: t("Decisions.Items.DataModeling"), icon: "fa-solid fa-database" },
    {
      text: t("Decisions.Items.ApiBoundaries"),
      icon: "fa-solid fa-diagram-project",
    },
    {
      text: t("Decisions.Items.ServiceDesign"),
      icon: "fa-solid fa-boxes-stacked",
    },
    {
      text: t("Decisions.Items.DeliveryPlanning"),
      icon: "fa-solid fa-calendar-week",
    },
    {
      text: t("Decisions.Items.PerformanceCost"),
      icon: "fa-solid fa-gauge-high",
    },
  ];

  return (
    <PageSection title={t("Decisions.Title")} id="decisions">
      <div className="card bg-light border-0 corners mb-5">
        <div className="card-body text-center">
          <p className="text-muted mb-0">{t("Decisions.Intro")}</p>
        </div>
      </div>

      <div className="row g-3">
        {decisions.map((decision, i) => (
          <div className="col-sm-6 col-lg-3" key={i}>
            <div className="card bg-light h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div
                  className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "44px", height: "44px" }}
                >
                  <i className={`${decision.icon} text-primary`} />
                </div>
                <p className="mb-0 fw-semibold">{decision.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffDecisions;
