import PageSection from "@/components/PageSection";

const HandsOffSnapshots = async ({ t }: { t: any }) => {
  const snapshots = [
    {
      title: t("Snapshots.Cases.PublicSector.Title"),
      body: t("Snapshots.Cases.PublicSector.Body"),
    },
    {
      title: t("Snapshots.Cases.BlockchainApp.Title"),
      body: t("Snapshots.Cases.BlockchainApp.Body"),
    },
    {
      title: t("Snapshots.Cases.Edtech.Title"),
      body: t("Snapshots.Cases.Edtech.Body"),
    },
  ];

  return (
    <PageSection title={t("Snapshots.Title")}>
      <div className="row g-3">
        {snapshots.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-1">{title}</h3>
              <p className="small text-muted mb-0">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffSnapshots;
