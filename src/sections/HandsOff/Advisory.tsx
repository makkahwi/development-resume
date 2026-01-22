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
      <p className="small text-muted mb-3">{t("Advisory.Intro")}</p>
      <div className="row justify-content-center g-3 mb-4">
        {modes.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-1">{title}</h3>
              <p className="small mb-0 text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <p className="mb-3">{t("Advisory.CtaText")}</p>
        <div className="d-flex justify-content-center gap-2">
          <a href="#contact" className="btn btn-primary">
            {t("Advisory.CtaPrimary")}
          </a>
          <a href="#download-cv" className="btn btn-outline-secondary">
            {t("Advisory.CtaSecondary")}
          </a>
        </div>
      </div>
    </PageSection>
  );
};

export default HandsOffAdvisory;
