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
          <div key={index} className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex align-items-start">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-check-circle-fill text-primary" />
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
