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
    <PageSection title={t("Principles.Title")} color="light" id="principles">
      <div className="row g-4">
        {principles.map(({ title, body }, i) => (
          <div className="col-md-6" key={i}>
            <div className="card h-100 border-0 corners px-3">
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

export default HandsOffPrinciples;
