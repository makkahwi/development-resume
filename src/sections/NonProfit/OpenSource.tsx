const OpenSourceSection = ({ t }: { t: any }) => {
  return (
    <section className="mb-5">
      <h2 className="h5 fw-semibold mb-3">{t("Community.Title")}</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="border rounded-3 p-3 h-100">
            <h3 className="h6 fw-bold mb-2">
              {t("Community.OpenSource.Title")}
            </h3>
            <p className="small text-muted mb-0">
              {t("Community.OpenSource.Body")}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border rounded-3 p-3 h-100">
            <h3 className="h6 fw-bold mb-2">
              {t("Community.NonProfit.Title")}
            </h3>
            <p className="small text-muted mb-0">
              {t("Community.NonProfit.Body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
