import PageSection from "@/components/PageSection";

const OpenToSection = async ({ t }: { t: Function }) => {
  const openToList = [
    { label: t("OpenTo.Development"), icon: "fa-solid fa-code" },
    { label: t("OpenTo.Advisory"), icon: "fa-solid fa-compass" },
    { label: t("OpenTo.Mentorship"), icon: "fa-solid fa-people-group" },
    { label: t("OpenTo.Architecture"), icon: "fa-solid fa-diagram-project" },
  ];

  return (
    <PageSection
      title={t("OpenTo.Title")}
      subtitle={t("OpenTo.Subtitle")}
      id="openTo"
    >
      <div className="row g-4 mb-5">
        {openToList.map((item, itemIndex) => (
          <div key={itemIndex} className="col-md-6">
            <div className="card h-100 border-0 corners px-3">
              <div className="card-body d-flex align-items-center">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className={`${item.icon} text-primary`} />
                </div>
                <h4 className="h6 fw-bold mb-0">{item.label}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 bg-primary corners px-4">
        <div className="card-body text-center py-4">
          <p className="lead mb-0 text-white fw-bold">
            {t("OpenTo.Conclusion")}
          </p>
        </div>
      </div>
    </PageSection>
  );
};

export default OpenToSection;
