import PageSection from "@/components/PageSection";

const HandsOffAdvisory = async ({ t }: { t: any }) => {
  const modes = [
    {
      title: t("Advisory.Modes.ArchitectureAudit.Title"),
      body: t("Advisory.Modes.ArchitectureAudit.Body"),
    },
    {
      title: t("Advisory.Modes.MvpScoping.Title"),
      body: t("Advisory.Modes.MvpScoping.Body"),
    },
    {
      title: t("Advisory.Modes.StackEvaluation.Title"),
      body: t("Advisory.Modes.StackEvaluation.Body"),
    },
    {
      title: t("Advisory.Modes.UxReview.Title"),
      body: t("Advisory.Modes.UxReview.Body"),
    },
    {
      title: t("Advisory.Modes.DevEnablement.Title"),
      body: t("Advisory.Modes.DevEnablement.Body"),
    },
  ];

  return (
    <PageSection title={t("Advisory.Title")}>
      <p className="text-muted text-center mb-5">{t("Advisory.Intro")}</p>
      <div className="row g-4 mb-5">
        {modes.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card bg-light h-100 border-0 shadow-sm">
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

export default HandsOffAdvisory;
