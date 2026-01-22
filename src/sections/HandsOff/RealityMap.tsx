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
    <PageSection title={t("RealityMap.Title")} color="light">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive table-bordered text-center">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fw-semibold py-4">
                    {t("RealityMap.Headers.Expectation")}
                  </th>
                  <th className="fw-semibold py-4">
                    {t("RealityMap.Headers.Reality")}
                  </th>
                  <th className="fw-semibold py-4">
                    {t("RealityMap.Headers.HowINavigate")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3">{row.expectation}</td>
                    <td className="py-3">{row.reality}</td>
                    <td className="py-3">{row.navigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default HandsOffRealityMap;
