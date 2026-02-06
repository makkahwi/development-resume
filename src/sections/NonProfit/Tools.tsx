import PageSection from "@/components/PageSection";

const ToolsSection = ({ t }: { t: any }) => {
  const freeTools = [
    { key: "ToolOne", icon: "fa-solid fa-screwdriver-wrench" },
    { key: "ToolTwo", icon: "fa-solid fa-rocket" },
    { key: "ToolThree", icon: "fa-solid fa-table-columns" },
  ];

  return (
    <PageSection color="light" noBg id="tools">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-3">{t("FreeTools.Title")}</h2>
          <p className="text-muted">{t("FreeTools.Intro")}</p>
        </div>
        <div className="row g-4">
          {freeTools.map(({ key, icon }) => (
            <div className="col-md-4" key={key}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div
                      className="bg-light border rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 44, height: 44 }}
                    >
                      <i className={`${icon} text-primary fs-5`} />
                    </div>
                    <div>
                      <h3 className="h5 fw-bold mb-1">
                        {t(`FreeTools.Items.${key}.Name`)}
                      </h3>
                      <span className="badge text-bg-primary-subtle text-primary fw-semibold">
                        {t(`FreeTools.Items.${key}.Status`)}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted mb-3">
                    {t(`FreeTools.Items.${key}.Description`)}
                  </p>
                  <p className="small text-muted mb-0">
                    {t("FreeTools.LabelStatus")}
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
