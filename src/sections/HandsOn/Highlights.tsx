import PageSection from "@/components/PageSection";

const HighlightsSection = async ({ t }: { t: Function }) => {
  const contents = [
    { label: t("Highlights.Content1"), icon: "fa-solid fa-chart-line" },
    { label: t("Highlights.Content2"), icon: "fa-solid fa-rocket" },
    { label: t("Highlights.Content3"), icon: "fa-solid fa-cogs" },
    { label: t("Highlights.Content4"), icon: "fa-solid fa-building" },
    { label: t("Highlights.Content5"), icon: "fa-solid fa-rocket" },
    { label: t("Highlights.Content6"), icon: "fa-solid fa-lightbulb" },
  ];

  return (
    <PageSection
      title={t("Highlights.Title")}
      subtitle={t("Highlights.Subtitle")}
      id="highlights"
    >
      <div className="row g-4">
        {contents.map(({ label, icon }, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card bg-light h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {index + 1}
                  </span>
                  <i className={`${icon} text-primary fs-4`} />
                </div>
                <p className="mb-0 text-muted">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HighlightsSection;
