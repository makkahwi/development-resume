import PageSection from "@/components/PageSection";

const OpenToSection = async ({ t }: { t: Function }) => {
  const openToList = [
    t("OpenTo.Development"),
    t("OpenTo.Advisory"),
    t("OpenTo.Mentorship"),
    t("OpenTo.Architecture"),
  ];

  return (
    <PageSection
      title="Open to New Opportunities"
      subtitle="What I'm looking for in my next role"
      id="openTo"
      color="light"
    >
      <div className="row g-4 mb-5">
        {openToList.map((item, itemIndex) => (
          <div key={itemIndex} className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-briefcase text-primary" />
                </div>
                <h4 className="h6 fw-bold mb-0">{item}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm bg-primary">
        <div className="card-body text-center py-4">
          <p className="lead mb-0 text-white">{t("OpenTo.Conclusion")}</p>
        </div>
      </div>
    </PageSection>
  );
};

export default OpenToSection;
