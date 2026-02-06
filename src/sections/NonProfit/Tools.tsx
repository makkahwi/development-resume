import PageSection from "@/components/PageSection";

const ToolsSection = ({ t }: { t: any }) => {
  const freeTools = ["ToolOne", "ToolTwo", "ToolThree"];

  return (
    <PageSection color="light" noBg id="tools">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-3">{t("FreeTools.Title")}</h2>
          <p className="text-muted">{t("FreeTools.Intro")}</p>
        </div>
        <div className="row g-4">
          {freeTools.map((key) => (
            <div className="col-md-4" key={key}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h5 fw-bold mb-3">
                    {t(`FreeTools.Items.${key}.Name`)}
                  </h3>
                  <p className="text-muted mb-3">
                    {t(`FreeTools.Items.${key}.Description`)}
                  </p>
                  <p className="small mb-0">
                    <span className="fw-semibold text-primary">
                      {t("FreeTools.LabelStatus")}:{" "}
                    </span>
                    <span className="text-muted">
                      {t(`FreeTools.Items.${key}.Status`)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default ToolsSection;
