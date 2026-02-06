import PageSection from "@/components/PageSection";

const OpenSourceSection = ({ t }: { t: any }) => {
  const contents = [
    {
      title: t("Community.OpenSource.Title"),
      body: t("Community.OpenSource.Body"),
      icon: "fa-brands fa-github",
    },
    {
      title: t("Community.NonProfit.Title"),
      body: t("Community.NonProfit.Body"),
      icon: "fa-solid fa-building",
    },
  ];

  return (
    <PageSection noBg id="community">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold">{t("Community.Title")}</h2>
        </div>
        <div className="row g-4">
          {contents.map(({ title, body, icon }, i) => (
            <div className="col-md-6" key={i}>
              <div className="card bg-light h-100 border-0 corners px-4">
                <div className="card-body">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div
                      className="bg-white border rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 44, height: 44 }}
                    >
                      <i className={`${icon} text-primary fs-5`} />
                    </div>
                    <div>
                      <h3 className="h5 fw-bold mb-1">{title}</h3>
                    </div>
                  </div>
                  <p className="text-muted mb-0">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default OpenSourceSection;

