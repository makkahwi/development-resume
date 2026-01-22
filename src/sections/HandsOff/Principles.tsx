import PageSection from "@/components/PageSection";

const HandsOffPrinciples = async ({ t }: { t: any }) => {
  const principles = [
    {
      title: t("Principles.Items.PrepareClarifyExecute.Title"),
      body: t("Principles.Items.PrepareClarifyExecute.Body"),
    },
    {
      title: t("Principles.Items.StructureOutlivesUrgency.Title"),
      body: t("Principles.Items.StructureOutlivesUrgency.Body"),
    },
    {
      title: t("Principles.Items.CalmFirstActLater.Title"),
      body: t("Principles.Items.CalmFirstActLater.Body"),
    },
    {
      title: t("Principles.Items.ScalabilityEarly.Title"),
      body: t("Principles.Items.ScalabilityEarly.Body"),
    },
  ];

  return (
    <PageSection title={t("Principles.Title")}>
      <div className="row g-3">
        {principles.map(({ title, body }, i) => (
          <div className="col-md-6" key={i}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-1">{title}</h3>
              <p className="small mb-0 text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffPrinciples;
