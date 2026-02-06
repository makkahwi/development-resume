import PageSection from "@/components/PageSection";

const HighlightsSection = async ({ t }: { t: Function }) => {
  const contents = [
    t("Highlights.Content1"),
    t("Highlights.Content2"),
    t("Highlights.Content3"),
    t("Highlights.Content4"),
    t("Highlights.Content5"),
    t("Highlights.Content6"),
  ];
  return (
    <PageSection
      title={t("Highlights.Title")}
      subtitle={t("Highlights.Subtitle")}
      id="highlights"
    >
      <div className="row g-4">
        {contents.map((content, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card bg-light h-100 border-0 corners px-3">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {index + 1}
                  </span>
                  <i className="bi bi-lightning-charge text-primary fs-4" />
                </div>
                <p className="mb-0 text-muted">{content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HighlightsSection;
