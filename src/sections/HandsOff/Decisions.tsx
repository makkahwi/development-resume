import PageSection from "@/components/PageSection";

const HandsOffDecisions = async ({ t }: { t: any }) => {
  const decisions = [
    t("Decisions.Items.FeatureScope"),
    t("Decisions.Items.UxAlignment"),
    t("Decisions.Items.AuthModels"),
    t("Decisions.Items.DataModeling"),
    t("Decisions.Items.ApiBoundaries"),
    t("Decisions.Items.ServiceDesign"),
    t("Decisions.Items.DeliveryPlanning"),
    t("Decisions.Items.PerformanceCost"),
  ];

  return (
    <PageSection title={t("Decisions.Title")}>
      <p className="text-center text-muted mb-5">{t("Decisions.Intro")}</p>

      <div className="row g-3">
        {decisions.map((decision, i) => (
          <div className="col-sm-6 col-lg-3" key={i}>
            <div className="card bg-light h-100 border-0 shadow-sm">
              <div className="card-body d-flex align-items-center justify-content-center text-center">
                <p className="mb-0 fw-semibold">{decision}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffDecisions;
