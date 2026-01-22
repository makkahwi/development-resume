const ToolsSection = ({ t }: { t: any }) => {
  const freeTools = ["ToolOne", "ToolTwo", "ToolThree"];

  return (
    <section className="mb-5">
      <h2 className="h5 fw-semibold mb-3">{t("FreeTools.Title")}</h2>
      <p className="small text-muted mb-3">{t("FreeTools.Intro")}</p>
      <div className="row g-3">
        {freeTools.map((key) => (
          <div className="col-md-4" key={key}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-1">
                {t(`FreeTools.Items.${key}.Name`)}
              </h3>
              <p className="small text-muted mb-1">
                {t(`FreeTools.Items.${key}.Description`)}
              </p>
              <p className="small mb-0">
                <span className="fw-semibold">
                  {t("FreeTools.LabelStatus")}{" "}
                </span>
                {t(`FreeTools.Items.${key}.Status`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolsSection;
