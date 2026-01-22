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
    <PageSection title={t("RealityMap.Title")}>
      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th className="small">{t("RealityMap.Headers.Expectation")}</th>
              <th className="small">{t("RealityMap.Headers.Reality")}</th>
              <th className="small">{t("RealityMap.Headers.HowINavigate")}</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.expectation}</td>
                <td>{row.reality}</td>
                <td>{row.navigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageSection>
  );
};

export default HandsOffRealityMap;
