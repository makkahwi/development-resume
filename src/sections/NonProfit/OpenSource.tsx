import PageSection from "@/components/PageSection";

const OpenSourceSection = ({ t }: { t: any }) => {
  const contents = [
    {
      title: t("Community.OpenSource.Title"),
      body: t("Community.OpenSource.Body"),
    },
    {
      title: t("Community.NonProfit.Title"),
      body: t("Community.NonProfit.Body"),
    },
  ];

  return (
    <PageSection noBg id="community">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold">{t("Community.Title")}</h2>
        </div>
        <div className="row g-4">
          {contents.map(({ title, body }, i) => (
            <div className="col-md-6" key={i}>
              <div className="card bg-light h-100 border-0 corners px-3">
                <div className="card-body">
                  <h3 className="h5 fw-bold mb-3">{title}</h3>
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
