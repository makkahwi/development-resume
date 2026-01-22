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
      <p className="small text-center text-muted mb-4">
        {t("Decisions.Intro")}
      </p>

      <div className="row g-2">
        {decisions.map((decision, i) => (
          <div className="col-sm-6 col-lg-3" key={i}>
            <div className="border rounded-3 p-2 h-100">
              <p className="small mb-0">{decision}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffDecisions;
