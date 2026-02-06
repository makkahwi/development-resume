import PageSection from "@/components/PageSection";

const HandsOffRoles = async ({ t }: { t: any }) => {
  const roles = [
    {
      title: t("Roles.ProductTranslator.Title"),
      body: t("Roles.ProductTranslator.Body"),
      icon: "bi bi-diagram-3",
    },
    {
      title: t("Roles.ArchitectureSteward.Title"),
      body: t("Roles.ArchitectureSteward.Body"),
      icon: "bi bi-bricks",
    },
    {
      title: t("Roles.DeveloperMentor.Title"),
      body: t("Roles.DeveloperMentor.Body"),
      icon: "bi bi-people",
    },
  ];
  return (
    <PageSection title={t("Roles.Title")} color="light" id="roles">
      <div className="row g-4">
        {roles.map(({ title, body, icon }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100 border-0 corners px-3">
              <div className="card-body">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "44px", height: "44px" }}
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

export default HandsOffRoles;
