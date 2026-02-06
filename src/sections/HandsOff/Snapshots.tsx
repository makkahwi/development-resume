import PageSection from "@/components/PageSection";

const HandsOffSnapshots = async ({ t }: { t: any }) => {
  const snapshots = [
    {
      title: t("Snapshots.Cases.PublicSector.Title"),
      body: t("Snapshots.Cases.PublicSector.Body"),
      icon: "bi bi-building",
    },
    {
      title: t("Snapshots.Cases.BlockchainApp.Title"),
      body: t("Snapshots.Cases.BlockchainApp.Body"),
      icon: "bi bi-shield-lock",
    },
    {
      title: t("Snapshots.Cases.Edtech.Title"),
      body: t("Snapshots.Cases.Edtech.Body"),
      icon: "bi bi-mortarboard",
    },
  ];

  return (
    <PageSection title={t("Snapshots.Title")} id="snapshots">
      <div className="row g-4">
        {snapshots.map(({ title, body, icon }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card bg-light h-100 border-0 corners">
              <div className="card-body">
                <div
                  className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "42px", height: "42px" }}
                >
                  <i className={`${icon} text-primary`} />
                </div>
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
