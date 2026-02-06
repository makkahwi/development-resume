import PageSection from "@/components/PageSection";

const HandsOffRealityMap = async ({ t }: { t: any }) => {
  const rows = [
    {
      expectation: t("RealityMap.Rows.Scope.Expectation"),
      reality: t("RealityMap.Rows.Scope.Reality"),
      navigation: t("RealityMap.Rows.Scope.Navigation"),
    },
    {
      expectation: t("RealityMap.Rows.Ux.Expectation"),
      reality: t("RealityMap.Rows.Ux.Reality"),
      navigation: t("RealityMap.Rows.Ux.Navigation"),
    },
    {
      expectation: t("RealityMap.Rows.Mvp.Expectation"),
      reality: t("RealityMap.Rows.Mvp.Reality"),
      navigation: t("RealityMap.Rows.Mvp.Navigation"),
    },
    {
      expectation: t("RealityMap.Rows.Tech.Expectation"),
      reality: t("RealityMap.Rows.Tech.Reality"),
      navigation: t("RealityMap.Rows.Tech.Navigation"),
    },
    {
      expectation: t("RealityMap.Rows.Juniors.Expectation"),
      reality: t("RealityMap.Rows.Juniors.Reality"),
      navigation: t("RealityMap.Rows.Juniors.Navigation"),
    },
  ];

  return (
    <PageSection title={t("RealityMap.Title")} color="light" id="reality-map">
      <div className="row g-4">
        {rows.map((row, i) => (
          <div className="col-12" key={i}>
            <div className="card border-0 corners px-3">
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                      {t("RealityMap.Headers.Expectation")}
                    </span>
                    <p className="text-muted mb-0">{row.expectation}</p>
                  </div>
                  <div className="col-md-4">
                    <span className="badge bg-dark bg-opacity-10 text-dark mb-2">
                      {t("RealityMap.Headers.Reality")}
                    </span>
                    <p className="text-muted mb-0">{row.reality}</p>
                  </div>
                  <div className="col-md-4">
                    <span className="badge bg-success bg-opacity-10 text-success mb-2">
                      {t("RealityMap.Headers.HowINavigate")}
                    </span>
                    <p className="text-muted mb-0">{row.navigation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffRealityMap;
