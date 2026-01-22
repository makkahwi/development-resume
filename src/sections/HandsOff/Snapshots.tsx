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
      <div className="row g-4">
        {snapshots.map(({ title, body }, i) => (
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

export default HandsOffSnapshots;
